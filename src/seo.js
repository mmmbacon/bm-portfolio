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
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${siteUrl}/blog/${post.slug}`,
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
      '@id': `${siteUrl}/blog/${post.slug}`,
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

export function getBlogListMeta(siteUrl) {
  return {
    title: `Blog | ${site.name}`,
    description: site.blogDescription,
    canonicalPath: '/blog',
    canonicalUrl: `${siteUrl}/blog`,
    ogType: 'website',
    ogImage: site.ogImage,
    ogImageAlt: site.ogImageAlt,
    includeProfileTags: false,
    jsonLd: null,
  };
}

export function getBlogPostMeta(post, siteUrl) {
  return {
    title: `${post.title} | ${site.name}`,
    description: post.description,
    canonicalPath: `/blog/${post.slug}`,
    canonicalUrl: `${siteUrl}/blog/${post.slug}`,
    ogType: 'article',
    ogImage: site.ogImage,
    ogImageAlt: site.ogImageAlt,
    includeProfileTags: false,
    jsonLd: getBlogPostJsonLd(post, siteUrl),
  };
}

export function getNextGenMeta(siteUrl) {
  const description =
    'NextGen is a database-first 3D plant design system for oil and gas — Electron, Three.js, NestJS, PostGIS, and OpenCascade.';
  const canonicalUrl = `${siteUrl}/projects/nextgen`;

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
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'NextGen',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Windows, Linux',
      description,
      url: canonicalUrl,
      codeRepository: 'https://github.com/mmmbacon/nextgen',
      author: {
        '@type': 'Person',
        name: site.name,
        url: siteUrl,
      },
    },
  };
}

export function getNextGenJsonLd(siteUrl) {
  return getNextGenMeta(siteUrl).jsonLd;
}
