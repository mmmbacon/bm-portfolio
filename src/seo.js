export const PRODUCTION_SITE_URL = 'https://brandonmacdonald.dev';

export const site = {
  name: 'Brandon Macdonald',
  title: 'Brandon Macdonald | Full Stack Developer, Calgary',
  description:
    'Brandon Macdonald is a full stack developer and technical lead in Calgary, AB. Vue.js, Node.js, TypeScript, and PHP. Production SaaS, APIs, and CI/CD.',
  blogDescription:
    'Thoughts and progress from Brandon Macdonald as he works through documents, tools, and systems.',
  locale: 'en_CA',
  jobTitle: 'Full Stack Developer',
  location: 'Calgary, AB, Canada',
  email: 'bmacdonald1986@gmail.com',
  ogImage:
    'https://res.cloudinary.com/mmmbacon/image/upload/c_fill,w_1200,h_630,g_auto/v1627357788/cdn/cargo1_r50wko.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Brandon Macdonald portfolio',
  profiles: [
    'https://github.com/mmmbacon',
    'https://www.linkedin.com/in/brandon-m-macdonald/',
  ],
  skills: [
    'Vue.js',
    'Node.js',
    'TypeScript',
    'PHP',
    'NestJS',
    'PostgreSQL',
    'Docker',
    'CI/CD',
  ],
};

export const NEXTGEN_HERO_PATH = '/blog/nextgen/01-desktop-shell.png';

export function resolveSiteUrl(env = {}, mode = 'development') {
  if (env.VITE_SITE_URL) {
    return env.VITE_SITE_URL.replace(/\/$/, '');
  }

  return mode === 'production'
    ? PRODUCTION_SITE_URL
    : 'http://localhost:5173';
}

export function getBreadcrumbJsonLd(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function getJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: site.name,
        jobTitle: site.jobTitle,
        url: siteUrl,
        email: `mailto:${site.email}`,
        image: site.ogImage,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Calgary',
          addressRegion: 'AB',
          addressCountry: 'CA',
        },
        sameAs: site.profiles,
        knowsAbout: site.skills,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: site.title,
        description: site.description,
        inLanguage: 'en-CA',
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: site.title,
        description: site.description,
        inLanguage: 'en-CA',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#person` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: site.ogImage,
        },
      },
    ],
  };
}

export function getBlogPostJsonLd(post, siteUrl) {
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    author: {
      '@type': 'Person',
      name: site.name,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: site.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags,
  };
}

export function getHomeMeta(siteUrl) {
  return {
    title: site.title,
    description: site.description,
    canonicalPath: '/',
    canonicalUrl: `${siteUrl}/`,
    ogType: 'profile',
    ogImage: site.ogImage,
    ogImageAlt: site.ogImageAlt,
    includeProfileTags: true,
    jsonLd: getJsonLd(siteUrl),
  };
}

export function getBlogListMeta(siteUrl, posts = []) {
  const canonicalUrl = `${siteUrl}/blog`;

  return {
    title: `Blog | ${site.name}`,
    description: site.blogDescription,
    canonicalPath: '/blog',
    canonicalUrl,
    ogType: 'website',
    ogImage: site.ogImage,
    ogImageAlt: site.ogImageAlt,
    includeProfileTags: false,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: `Blog | ${site.name}`,
          description: site.blogDescription,
          isPartOf: { '@id': `${siteUrl}/#website` },
        },
        {
          '@type': 'ItemList',
          itemListElement: posts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${siteUrl}/blog/${post.slug}`,
            name: post.title,
          })),
        },
        getBreadcrumbJsonLd([
          { name: 'Home', url: siteUrl },
          { name: 'Blog', url: canonicalUrl },
        ]),
      ],
    },
    crawlContent: {
      heading: 'Blog',
      summary: site.blogDescription,
      links: [
        { href: '/', label: 'Home' },
        ...posts.slice(0, 8).map((post) => ({
          href: `/blog/${post.slug}`,
          label: post.title,
        })),
      ],
    },
  };
}

export function getBlogPostMeta(post, siteUrl) {
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | ${site.name}`,
    description: post.description,
    canonicalPath: `/blog/${post.slug}`,
    canonicalUrl,
    ogType: 'article',
    ogImage: site.ogImage,
    ogImageAlt: site.ogImageAlt,
    includeProfileTags: false,
    article: post.date
      ? {
          publishedTime: post.date,
          modifiedTime: post.date,
        }
      : null,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        getBlogPostJsonLd(post, siteUrl),
        getBreadcrumbJsonLd([
          { name: 'Home', url: siteUrl },
          { name: 'Blog', url: `${siteUrl}/blog` },
          { name: post.title, url: canonicalUrl },
        ]),
      ],
    },
    crawlContent: {
      heading: post.title,
      summary: post.description,
      links: [
        { href: '/', label: 'Home' },
        { href: '/blog', label: 'Blog' },
        { href: '/projects/nextgen', label: 'NextGen project' },
      ],
    },
  };
}

export function getNextGenMeta(siteUrl) {
  const description =
    'NextGen is a database-first 3D plant design system for oil and gas — Electron, Three.js, NestJS, PostGIS, and OpenCascade.';
  const canonicalUrl = `${siteUrl}/projects/nextgen`;
  const appId = `${canonicalUrl}#app`;

  return {
    title: `NextGen | ${site.name}`,
    description,
    canonicalPath: '/projects/nextgen',
    canonicalUrl,
    ogType: 'website',
    ogImage: `${siteUrl}${NEXTGEN_HERO_PATH}`,
    ogImageAlt:
      'NextGen desktop shell with 3D viewport, discipline toolbar, and object tree',
    ogImageWidth: 1777,
    ogImageHeight: 1073,
    includeProfileTags: false,
    preloadImages: [`${siteUrl}${NEXTGEN_HERO_PATH}`],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': appId,
          name: 'NextGen',
          applicationCategory: 'DesignApplication',
          operatingSystem: 'Windows, Linux',
          description,
          url: canonicalUrl,
          image: `${siteUrl}${NEXTGEN_HERO_PATH}`,
          codeRepository: 'https://github.com/mmmbacon/nextgen',
          author: {
            '@type': 'Person',
            name: site.name,
            url: siteUrl,
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: `NextGen | ${site.name}`,
          description,
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `${siteUrl}${NEXTGEN_HERO_PATH}`,
          },
          mainEntity: { '@id': appId },
          isPartOf: { '@id': `${siteUrl}/#website` },
        },
        getBreadcrumbJsonLd([
          { name: 'Home', url: siteUrl },
          { name: 'Projects', url: `${siteUrl}/#projects` },
          { name: 'NextGen', url: canonicalUrl },
        ]),
      ],
    },
    crawlContent: {
      heading: 'NextGen',
      summary: description,
      links: [
        { href: '/', label: 'Home' },
        { href: '/#projects', label: 'Projects' },
        {
          href: 'https://github.com/mmmbacon/nextgen',
          label: 'NextGen on GitHub',
        },
        {
          href: '/blog/building-nextgen',
          label: 'Building NextGen (blog)',
        },
      ],
    },
  };
}

export function getNextGenJsonLd(siteUrl) {
  return getNextGenMeta(siteUrl).jsonLd;
}
