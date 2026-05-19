import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
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
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = resolveSiteUrl(env, mode);

  return {
    plugins: [vue(), seoPlugin(siteUrl)],
  };
});
