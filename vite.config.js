import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import matter from 'gray-matter';
import {
  getBlogListMeta,
  getBlogPostMeta,
  getHomeMeta,
  getNextGenMeta,
  resolveSiteUrl,
  site,
} from './src/seo.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function extractViteAssetTags(builtIndexHtml) {
  const tags = [];
  const moduleScripts = builtIndexHtml.match(
    /<script type="module"[^>]*src="\/assets\/[^"]+"[^>]*><\/script>/g,
  );
  const stylesheets = builtIndexHtml.match(
    /<link rel="stylesheet"[^>]*href="\/assets\/[^"]+"[^>]*>/g,
  );

  if (moduleScripts) {
    tags.push(...moduleScripts);
  }

  if (stylesheets) {
    tags.push(...stylesheets);
  }

  return tags.join('\n    ');
}

function renderHead(meta, viteAssetTags = '') {
  const profileTags = meta.includeProfileTags
    ? `
    <meta property="profile:first_name" content="Brandon" />
    <meta property="profile:last_name" content="Macdonald" />
    <meta property="profile:username" content="mmmbacon" />`
    : '';

  const articleTags = meta.article?.publishedTime
    ? `
    <meta property="article:published_time" content="${escapeHtml(meta.article.publishedTime)}" />
    <meta property="article:modified_time" content="${escapeHtml(meta.article.modifiedTime || meta.article.publishedTime)}" />`
    : '';

  const preloadTags = (meta.preloadImages || [])
    .map(
      (href) =>
        `\n    <link rel="preload" as="image" href="${escapeHtml(href)}" fetchpriority="high" />`,
    )
    .join('');

  const jsonLdTag = meta.jsonLd
    ? `\n    <script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
    : '';

  const assetTags = viteAssetTags ? `\n    ${viteAssetTags}` : '';
  const imageWidth = meta.ogImageWidth ?? site.ogImageWidth;
  const imageHeight = meta.ogImageHeight ?? site.ogImageHeight;

  return `  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="author" content="Brandon Macdonald" />
    <meta
      name="robots"
      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    />
    <link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />
    <meta name="theme-color" content="#f8fafc" />

    <!-- Open Graph -->
    <meta property="og:type" content="${escapeHtml(meta.ogType)}" />
    <meta property="og:site_name" content="Brandon Macdonald" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${escapeHtml(meta.canonicalUrl)}" />
    <meta property="og:locale" content="en_CA" />
    <meta property="og:image" content="${escapeHtml(meta.ogImage)}" />
    <meta property="og:image:width" content="${imageWidth}" />
    <meta property="og:image:height" content="${imageHeight}" />
    <meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />${profileTags}${articleTags}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />

    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,200&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway:wght@800;900&display=swap"
      rel="stylesheet"
    />${preloadTags}${assetTags}${jsonLdTag}
  </head>`;
}

function renderCrawlFallback(meta) {
  if (!meta.crawlContent) {
    return '';
  }

  const links = (meta.crawlContent.links || [])
    .map(
      (link) =>
        `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`,
    )
    .join('');

  return `<noscript>
  <div class="noscript">
    <h1>${escapeHtml(meta.crawlContent.heading)}</h1>
    <p>${escapeHtml(meta.crawlContent.summary)}</p>
    <nav aria-label="Related links">
      <ul>${links}</ul>
    </nav>
  </div>
</noscript>
`;
}

function applyHomePlaceholders(html, siteUrl) {
  const home = getHomeMeta(siteUrl);

  return html
    .replaceAll('__SITE_URL__', siteUrl)
    .replaceAll('__SITE_TITLE__', home.title)
    .replaceAll('__SITE_DESCRIPTION__', home.description)
    .replaceAll('__OG_IMAGE__', home.ogImage)
    .replaceAll('__OG_IMAGE_WIDTH__', String(site.ogImageWidth))
    .replaceAll('__OG_IMAGE_HEIGHT__', String(site.ogImageHeight))
    .replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(home.jsonLd)}</script></head>`,
    );
}

function assemblePage(builtIndexHtml, meta) {
  const bodyMatch = builtIndexHtml.match(/<body[\s\S]*<\/html>\s*$/i);

  if (!bodyMatch) {
    throw new Error('Could not extract body from built index.html');
  }

  const viteAssetTags = extractViteAssetTags(builtIndexHtml);

  if (!viteAssetTags) {
    throw new Error('Could not extract Vite asset tags from built index.html');
  }

  const bodyHtml = bodyMatch[0].replace(
    '<div id="app"></div>',
    `${renderCrawlFallback(meta)}    <div id="app"></div>`,
  );

  return `<!DOCTYPE html>
<html lang="en-CA">
${renderHead(meta, viteAssetTags)}
${bodyHtml}`;
}

function writeShell(outDir, relativePath, html) {
  const filePath = join(outDir, relativePath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

function seoPlugin(siteUrl) {
  return {
    name: 'seo',
    transformIndexHtml(html) {
      return applyHomePlaceholders(html, siteUrl);
    },
    generateBundle() {
      const blogPosts = getPublishedBlogPosts();
      const blogUrls = blogPosts
        .map((post) => {
          const lastmod = post.date
            ? `    <lastmod>${post.date}</lastmod>\n`
            : '';

          return `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
${lastmod}    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
        })
        .join('\n');

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/projects/nextgen</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${blogUrls}
</urlset>`;

      const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
    },
    writeBundle(outputOptions) {
      const outDir = outputOptions.dir;

      if (!outDir) {
        return;
      }

      const builtIndex = readFileSync(join(outDir, 'index.html'), 'utf8');
      const blogPosts = getPublishedBlogPosts();

      writeShell(
        outDir,
        'blog/index.html',
        assemblePage(builtIndex, getBlogListMeta(siteUrl, blogPosts)),
      );
      writeShell(
        outDir,
        'projects/nextgen/index.html',
        assemblePage(builtIndex, getNextGenMeta(siteUrl)),
      );

      for (const post of blogPosts) {
        writeShell(
          outDir,
          `blog/${post.slug}/index.html`,
          assemblePage(builtIndex, getBlogPostMeta(post, siteUrl)),
        );
      }
    },
  };
}

function getPublishedBlogPosts() {
  const blogDirectory = join(process.cwd(), 'content/blog');

  if (!existsSync(blogDirectory)) {
    return [];
  }

  return readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const filePath = join(blogDirectory, fileName);
      const { data } = matter(readFileSync(filePath, 'utf8'));

      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title || fileName.replace(/\.md$/, ''),
        description: data.description || '',
        date: normalizeDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags : [],
        published: data.published === true,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function normalizeDate(value) {
  if (!value) {
    return '';
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = resolveSiteUrl(env, mode);

  return {
    plugins: [vue(), seoPlugin(siteUrl)],
    test: {
      environment: 'happy-dom',
    },
  };
});
