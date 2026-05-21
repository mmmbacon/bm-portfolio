export function sectionId(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

export const sections = [
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/cargo1_r50wko.png',
    title: 'About Me',
    description:
      'Full stack developer and technical lead with 5+ years building production SaaS platforms across Vue, PHP, TypeScript, and Node.js. I work across the full stack: API design, frontend architecture, database modelling, CI/CD, and test infrastructure. I am comfortable leading technical decisions, mentoring developers, and collaborating closely with Product in remote, distributed teams.',
    highlights: [
      'Technical lead on AxiomWorx 5, a multi-module PMIS/ERP for EPCM project delivery, ~1 year in production across 3 clients',
      'Major contributor across five production platform services and the core NestJS API and Vue 3 SPA',
      'Full-Stack Web Development diploma, Lighthouse Labs (2021)',
      'Technical background: 10+ years in structural design and .NET tooling before software',
      'Outside of code: inline skating, brewing beer, and building things that work well',
    ],
  },
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/engine1_ayc9ze.png',
    title: 'Front End',
    description:
      'I build responsive, maintainable UIs with a focus on component architecture, performance, and developer experience. My recent work centres on Vue 3 production apps with permission-driven routing and shared patterns that scale across product modules.',
    highlights: [
      'Vue 3 (Composition API), Pinia, Vite, and TypeScript on a large modular SPA',
      'MSAL authentication with permission-driven dynamic routing built from server-side definitions',
      'Typed API client modules and DTO-to-view-model transformers across delivery, finance, and procurement',
      'Socket.IO client tied to auth sessions for live list refreshes and notifications',
      'Cypress E2E and Jest unit tests wired into a cross-repo orchestrated CI pipeline',
      'Also experienced with React, Svelte, and responsive UI design',
    ],
  },
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/caboose1_ozce2s.png',
    title: 'Back End',
    description:
      'I design and ship APIs and platform infrastructure where reliability, security, and careful handling of sensitive data matter. From REST integrations to self-hosted inference stacks, I own the backend through deployment.',
    highlights: [
      'NestJS and PostgreSQL (Knex/Objection, TypeORM) on a production PMIS platform',
      'Content-addressed document store with immutable versioning; migrated 2M+ legacy files',
      'Azure AD / JWT auth, RBAC, discipline guards, and authenticated Socket.IO gateways',
      'Self-hosted OpenAI-compatible LLM stack (LiteLLM, vLLM) with model routing and Langfuse tracing',
      'Microsoft Graph email integration for bidirectional helpdesk ticketing',
      'Docker, GitHub Actions, Caddy-routed preview environments, and GHCR deploy pipelines',
    ],
  },
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357789/cdn/cargo2_yj22cz.png',
    title: 'Experience',
    description:
      'Professional experience across SaaS product teams, remote startups, and technical consulting, progressing from full-stack delivery to technical lead on a production PMIS platform.',
    highlights: [
      'Technical Lead, Axiomworx (Equinox Engineering), Aug 2024 – Present',
      'Major contributor to five production services: dev orchestration, preview deploys, document management, LLM inference, and helpdesk',
      'Major contributor to the platform NestJS API and Vue 3 SPA across delivery, finance, and procurement domains',
      'Developer control plane (devman) for 8 interdependent repos, used daily by a team of 6; full-stack onboarding in a handful of commands',
      'Per-ticket preview deployment orchestrator with a shared build cache that roughly halved repeated preview build times',
      'Content-addressed DMS with 2M+ legacy documents migrated; platform serving 3 EPCM clients in production for ~1 year',
      'Intermediate Full Stack Developer, Sippo Beverage Displays (Remote Contract), Jan 2023 – Aug 2024',
      'Intermediate Full Stack Developer, Kegshoe (Remote), Sep 2021 – Aug 2024',
      'Structural Designer II / .NET Developer, Fluor Canada, Jan 2014 – Jan 2021',
    ],
  },
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/caboose1_ozce2s.png',
    title: 'Projects',
    description: 'Personal and learning projects from my development journey:',
    links: true,
  },
];
