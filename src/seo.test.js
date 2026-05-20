import { describe, expect, it } from 'vitest';
import { getJsonLd, site } from './seo.js';

const siteUrl = 'https://example.com';

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
