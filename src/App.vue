<template>
  <div class="page">
    <header class="hero">
      <h1 class="hero__name">Brandon Macdonald</h1>
      <p class="hero__role">Full Stack Software Engineer</p>
      <p class="hero__tagline">Vue.js · Node.js · TypeScript · PHP</p>
      <p class="hero__location">Calgary, AB</p>
      <nav class="hero__links" aria-label="Social links">
        <a
          href="https://github.com/mmmbacon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <img
            src="/img/GitHub-Mark-64px.png"
            alt=""
            class="hero__icon hero__icon--github"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/brandon-m-macdonald/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <img
            src="/img/icons8-linkedin-50.png"
            alt=""
            class="hero__icon hero__icon--social"
          />
        </a>
        <a href="mailto:bmacdonald1986@gmail.com" aria-label="Email">
          <img
            src="/img/icons8-secured-letter-50.png"
            alt=""
            class="hero__icon hero__icon--social"
          />
        </a>
      </nav>
    </header>

    <main class="sections">
      <Section
        v-for="(section, index) in sections"
        :key="section.title"
        :url="section.url"
        :title="section.title"
        :description="section.description"
        :highlights="section.highlights"
        :links="section.links"
        :reverse="index % 2 === 1"
      />
    </main>
  </div>
</template>

<script setup>
import Section from './components/Section.vue';

const sections = [
  {
    url: 'https://res.cloudinary.com/mmmbacon/image/upload/v1627357788/cdn/cargo1_r50wko.png',
    title: 'About Me',
    description:
      'Full stack software engineer and technical lead with 5+ years building production SaaS platforms across Vue, PHP, TypeScript, and Node.js. I work across the full stack—API design, frontend architecture, database modelling, CI/CD, and test infrastructure—and I am comfortable leading technical decisions, mentoring developers, and collaborating closely with Product in remote, distributed teams.',
    highlights: [
      'Technical lead on Axiom 5, a multi-module production Project Information Management System (PMIS)',
      'Full-Stack Web Development diploma, Lighthouse Labs (2021)',
      'Engineering background: 10+ years in structural design and .NET tooling before software',
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
      'Professional experience across SaaS product teams, remote startups, and engineering consulting—progressing from full-stack delivery to technical lead.',
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
</script>

<style scoped>
.page {
  min-height: 100vh;
}

.hero {
  text-align: center;
  padding: 2.5rem 1.5rem 2rem;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.hero__name {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem;
  color: #0f172a;
}

.hero__role {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0f766e;
  margin: 0 0 0.5rem;
}

.hero__tagline {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 0.25rem;
}

.hero__location {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0 0 1.25rem;
}

.hero__links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.hero__links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.hero__links a:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
}

.hero__icon {
  display: block;
  width: auto;
}

.hero__icon--github {
  height: 22px;
}

.hero__icon--social {
  height: 25px;
}

.sections {
  background: #fff;
  padding: 1.25rem 0 2.5rem;
}
</style>
