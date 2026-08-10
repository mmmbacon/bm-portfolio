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
  it('builds blog list meta with shared description', () => {
    const meta = getBlogListMeta(siteUrl);

    expect(meta.title).toBe(`Blog | ${site.name}`);
    expect(meta.description).toBe(site.blogDescription);
    expect(meta.canonicalUrl).toBe(`${siteUrl}/blog`);
    expect(meta.ogType).toBe('website');
  });

  it('builds blog post meta and JSON-LD from frontmatter fields', () => {
    const post = {
      slug: 'building-nextgen',
      title: 'Building NextGen',
      description: 'A plant design system walkthrough.',
      date: '2026-08-10',
      tags: ['nextgen'],
    };
    const meta = getBlogPostMeta(post, siteUrl);

    expect(meta.canonicalUrl).toBe(`${siteUrl}/blog/building-nextgen`);
    expect(meta.ogType).toBe('article');
    expect(meta.jsonLd['@type']).toBe('BlogPosting');
    expect(meta.jsonLd.url).toBe(meta.canonicalUrl);
  });

  it('builds NextGen meta with project image and SoftwareApplication JSON-LD', () => {
    const meta = getNextGenMeta(siteUrl);

    expect(meta.title).toBe(`NextGen | ${site.name}`);
    expect(meta.canonicalUrl).toBe(`${siteUrl}/projects/nextgen`);
    expect(meta.ogImage).toContain('/blog/nextgen/01-desktop-shell.png');
    expect(meta.ogImageWidth).toBe(1777);
    expect(meta.ogImageHeight).toBe(1073);
    expect(meta.jsonLd['@type']).toBe('SoftwareApplication');
    expect(meta.jsonLd.url).toBe(meta.canonicalUrl);
  });

  it('uses a 1200x630 Open Graph image', () => {
    expect(site.ogImageWidth).toBe(1200);
    expect(site.ogImageHeight).toBe(630);
    expect(site.ogImage).toContain('w_1200');
    expect(site.ogImage).toContain('h_630');
  });
});
