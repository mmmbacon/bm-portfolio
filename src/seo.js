export const site = {
  name: 'Brandon Macdonald',
  title: 'Brandon Macdonald | Full Stack Developer — Calgary',
  description:
    'Brandon Macdonald is a full stack developer and technical lead in Calgary, AB. Vue.js, Node.js, TypeScript, and PHP. Production SaaS, APIs, and CI/CD.',
  blogDescription:
    'Thoughts and progress from Brandon Macdonald as he works through documents, tools, and systems.',
  locale: 'en_CA',
  jobTitle: 'Full Stack Developer',
  location: 'Calgary, AB, Canada',
  email: 'bmacdonald1986@gmail.com',
  ogImage:
    'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/cargo1_r50wko.png',
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
