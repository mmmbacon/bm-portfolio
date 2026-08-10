import { describe, expect, it } from 'vitest';
import {
  getBlogListMeta,
  getBlogPostMeta,
  getJsonLd,
  getNextGenMeta,
  PRODUCTION_SITE_URL,
  resolveSiteUrl,
  site,
} from './seo.js';

const siteUrl = 'https://example.com';

describe('resolveSiteUrl', () => {
  it('prefers VITE_SITE_URL when set', () => {
    expect(
      resolveSiteUrl({ VITE_SITE_URL: 'https://custom.example/' }, 'production'),
    ).toBe('https://custom.example');
  });

  it('defaults production builds to brandonmacdonald.dev', () => {
    expect(resolveSiteUrl({}, 'production')).toBe(PRODUCTION_SITE_URL);
    expect(PRODUCTION_SITE_URL).toBe('https://brandonmacdonald.dev');
  });

  it('defaults development builds to localhost', () => {
    expect(resolveSiteUrl({}, 'development')).toBe('http://localhost:5173');
  });
});

describe('getJsonLd', () => {
  it('returns Person, WebSite, and ProfilePage nodes', () => {
    const jsonLd = getJsonLd(siteUrl);
    const types = jsonLd['@graph'].map((node) => node['@type']);

    expect(types).toEqual(['Person', 'WebSite', 'ProfilePage']);
  });

  it('uses the site URL in entity ids and canonical URLs', () => {
    const jsonLd = getJsonLd(siteUrl);
    const person = jsonLd['@graph'].find((node) => node['@type'] === 'Person');

    expect(person['@id']).toBe(`${siteUrl}/#person`);
    expect(person.url).toBe(siteUrl);
    expect(person.name).toBe(site.name);
  });

  it('links WebSite publisher to the Person entity', () => {
    const jsonLd = getJsonLd(siteUrl);
    const website = jsonLd['@graph'].find((node) => node['@type'] === 'WebSite');

    expect(website.publisher).toEqual({ '@id': `${siteUrl}/#person` });
  });
});

describe('page meta helpers', () => {
  it('builds blog list meta with collection JSON-LD and crawl links', () => {
    const posts = [
      { slug: 'building-nextgen', title: 'Building NextGen' },
      { slug: 'modernizing-trakr', title: 'Modernizing Trakr' },
    ];
    const meta = getBlogListMeta(siteUrl, posts);
    const types = meta.jsonLd['@graph'].map((node) => node['@type']);

    expect(meta.title).toBe(`Blog | ${site.name}`);
    expect(meta.description).toBe(site.blogDescription);
    expect(meta.canonicalUrl).toBe(`${siteUrl}/blog`);
    expect(meta.ogType).toBe('website');
    expect(types).toEqual(['CollectionPage', 'ItemList', 'BreadcrumbList']);
    expect(meta.crawlContent.links.some((link) => link.href === '/blog/building-nextgen')).toBe(
      true,
    );
  });

  it('builds blog post meta with article dates, graph JSON-LD, and crawl copy', () => {
    const post = {
      slug: 'building-nextgen',
      title: 'Building NextGen',
      description: 'A plant design system walkthrough.',
      date: '2026-08-10',
      tags: ['nextgen'],
    };
    const meta = getBlogPostMeta(post, siteUrl);
    const types = meta.jsonLd['@graph'].map((node) => node['@type']);
    const article = meta.jsonLd['@graph'].find((node) => node['@type'] === 'BlogPosting');

    expect(meta.canonicalUrl).toBe(`${siteUrl}/blog/building-nextgen`);
    expect(meta.ogType).toBe('article');
    expect(meta.article).toEqual({
      publishedTime: '2026-08-10',
      modifiedTime: '2026-08-10',
    });
    expect(types).toEqual(['BlogPosting', 'BreadcrumbList']);
    expect(article.url).toBe(meta.canonicalUrl);
    expect(meta.crawlContent.heading).toBe(post.title);
  });

  it('builds NextGen meta with app/webpage/breadcrumb graph and preload', () => {
    const meta = getNextGenMeta(siteUrl);
    const types = meta.jsonLd['@graph'].map((node) => node['@type']);
    const app = meta.jsonLd['@graph'].find((node) => node['@type'] === 'SoftwareApplication');

    expect(meta.title).toBe(`NextGen | ${site.name}`);
    expect(meta.canonicalUrl).toBe(`${siteUrl}/projects/nextgen`);
    expect(meta.ogImage).toContain('/blog/nextgen/01-desktop-shell.png');
    expect(meta.ogImageWidth).toBe(1777);
    expect(meta.ogImageHeight).toBe(1073);
    expect(meta.preloadImages).toEqual([`${siteUrl}/blog/nextgen/01-desktop-shell.png`]);
    expect(types).toEqual(['SoftwareApplication', 'WebPage', 'BreadcrumbList']);
    expect(app.url).toBe(meta.canonicalUrl);
    expect(meta.crawlContent.links.some((link) => link.href === '/blog/building-nextgen')).toBe(
      true,
    );
  });

  it('uses a 1200x630 Open Graph image', () => {
    expect(site.ogImageWidth).toBe(1200);
    expect(site.ogImageHeight).toBe(630);
    expect(site.ogImage).toContain('w_1200');
    expect(site.ogImage).toContain('h_630');
  });
});
