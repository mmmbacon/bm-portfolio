import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import matter from 'gray-matter';
import { getJsonLd, site } from './src/seo.js';

function resolveSiteUrl(env, mode) {
  if (env.VITE_SITE_URL) {
    return env.VITE_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return mode === 'production'
    ? 'https://bm-portfolio.vercel.app'
    : 'http://localhost:5173';
}

function seoPlugin(siteUrl) {
  const jsonLd = JSON.stringify(getJsonLd(siteUrl));

  return {
    name: 'seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__SITE_TITLE__', site.title)
        .replaceAll('__SITE_DESCRIPTION__', site.description)
        .replaceAll('__OG_IMAGE__', site.ogImage)
        .replace('</head>', `<script type="application/ld+json">${jsonLd}</script></head>`);
    },
    generateBundle() {
      const blogUrls = getPublishedBlogPosts().map((post) => {
        const lastmod = post.date
          ? `    <lastmod>${post.date}</lastmod>\n`
          : '';

        return `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
${lastmod}    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }).join('\n');

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
${blogUrls}
</urlset>`;

      const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
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
        date: normalizeDate(data.date),
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
