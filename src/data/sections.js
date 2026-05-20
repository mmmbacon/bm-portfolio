export function sectionId(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

export const sections = [
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/cargo1_r50wko.png',
    title: 'About Me',
    description:
      'Full stack developer and technical lead with 5+ years building production SaaS platforms across Vue, PHP, TypeScript, and Node.js. I work across the full stack—API design, frontend architecture, database modelling, CI/CD, and test infrastructure—and I am comfortable leading technical decisions, mentoring developers, and collaborating closely with Product in remote, distributed teams.',
    highlights: [
      'Technical lead on Axiom 5, a multi-module production Project Information Management System (PMIS)',
      'Full-Stack Web Development diploma, Lighthouse Labs (2021)',
      'Technical background: 10+ years in structural design and .NET tooling before software',
      'Outside of code: inline skating and building things that work well',
    ],
  },
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/engine1_ayc9ze.png',
    title: 'Front End',
    description:
      'I build responsive, maintainable UIs with a focus on component architecture, performance, and developer experience. My recent work centres on Vue 3 production apps with shared component libraries that scale across product modules.',
    highlights: [
      'Vue 3, Pinia, Vite, and TypeScript for production SaaS frontends',
      'Reusable component libraries and shared patterns across product modules',
      '35% reduction in page-load times through frontend performance work',
      'Jest unit and Cypress E2E tests at 90%+ coverage, gated in PR CI/CD',
      'Also experienced with React, Svelte, and responsive UI design',
    ],
  },
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/caboose1_ozce2s.png',
    title: 'Back End',
    description:
      'I design and ship APIs and platform infrastructure where reliability, security, and careful handling of sensitive data matter. From REST integrations to event-driven pipelines, I own the backend through deployment.',
    highlights: [
      'NestJS, PostgreSQL, and TypeORM on current production platforms',
      'Event-driven workflows with Redis—retries, fallbacks, observability',
      'REST APIs, Stripe billing, Azure AD / MSAL auth, RBAC, and audit logging',
      'PHP / Slim 3 for customer-facing marketplace and admin applications',
      'Docker, GitHub Actions CI/CD, and zero-downtime deployments under 5 minutes',
    ],
  },
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357789/cdn/cargo2_yj22cz.png',
    title: 'Experience',
    description:
      'Professional experience across SaaS product teams, remote startups, and technical consulting—progressing from full-stack delivery to technical lead.',
    highlights: [
      'Technical Lead, Axiomworx (Equinox Engineering) — Aug 2024 – Present',
      'Senior Full Stack Developer, AxiomWorx — Jun – Aug 2024',
      'QA / SDET, Axiomworx — Apr – Jun 2024',
      'Intermediate Full Stack Developer, Sippo Beverage Displays (Remote) — Jan 2023 – Aug 2024',
      'Intermediate Full Stack Developer, Kegshoe (Remote) — Sep 2021 – Aug 2024',
      'Structural Designer II / .NET Developer, Fluor Canada — Jan 2014 – Jan 2021',
    ],
  },
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/caboose1_ozce2s.png',
    title: 'Projects',
    description: 'Personal and learning projects from my development journey:',
    links: true,
  },
];
