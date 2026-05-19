<template>
  <section :id="sectionId" class="portfolio-section" :class="{ 'portfolio-section--reverse': reverse }">
    <div class="portfolio-section__inner">
      <div class="portfolio-section__media">
        <img :src="url" :alt="title" />
      </div>
      <div class="portfolio-section__content">
        <h2 class="portfolio-section__title">{{ title }}</h2>
        <p class="portfolio-section__description">{{ description }}</p>
        <ul v-if="highlights?.length" class="portfolio-section__highlights">
          <li v-for="item in highlights" :key="item">{{ item }}</li>
        </ul>
        <ul v-if="links" class="portfolio-section__projects">
          <li v-for="project in projects" :key="project.name">
            <a :href="project.href" target="_blank" rel="noopener noreferrer">{{ project.name }}</a>
            <p>{{ project.stack }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  sectionId: String,
  title: String,
  description: String,
  url: String,
  links: Boolean,
  highlights: {
    type: Array,
    default: () => [],
  },
  reverse: {
    type: Boolean,
    default: false,
  },
})

const projects = [
  {
    name: 'Trakr',
    href: 'https://github.com/mmmbacon/trakr',
    stack: 'A Job Application Tracker | Node.js, React, Redux, MaterialUI, Rails',
  },
  {
    name: 'Tinyapp',
    href: 'https://github.com/mmmbacon/tinyapp',
    stack: 'A URL Link Shortener | Node.js, Bootstrap, and EJS',
  },
  {
    name: 'SkateSpot',
    href: 'https://github.com/mmmbacon/yyc-skatespots',
    stack: 'A skate spot locator and blog | Node.js, React, MaterialUI, GraphQL, Apollo',
  },
  {
    name: 'This Site!',
    href: 'https://github.com/mmmbacon/bm-portfolio',
    stack: 'My Personal Portfolio | Vue 3, Vite',
  },
]
</script>

<style scoped>
.portfolio-section {
  padding: 2.25rem 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.portfolio-section:last-child {
  border-bottom: none;
}

.portfolio-section__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 768px) {
  .portfolio-section__inner {
    flex-direction: row;
    align-items: center;
    gap: 2.75rem;
  }

  .portfolio-section--reverse .portfolio-section__inner {
    flex-direction: row-reverse;
  }
}

.portfolio-section__media {
  flex: 0 0 auto;
}

.portfolio-section__media img {
  display: block;
  width: min(280px, 70vw);
  height: auto;
  filter: drop-shadow(0 16px 32px rgba(15, 23, 42, 0.12));
}

.portfolio-section__content {
  flex: 1;
  text-align: left;
}

.portfolio-section__title {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0f766e;
  margin-bottom: 0.6rem;
}

.portfolio-section__description {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.55;
  color: #475569;
  margin-bottom: 0;
  text-align: left;
}

.portfolio-section__highlights {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}

.portfolio-section__highlights li {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.4rem;
  font-size: 0.92rem;
  line-height: 1.5;
  color: #475569;
}

.portfolio-section__highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #14b8a6;
}

.portfolio-section__highlights li:last-child {
  margin-bottom: 0;
}

.portfolio-section__projects {
  list-style: none;
  padding: 0;
  margin: 0.85rem 0 0;
}

.portfolio-section__projects li {
  margin-bottom: 0.9rem;
}

.portfolio-section__projects li:last-child {
  margin-bottom: 0;
}

.portfolio-section__projects a {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 2px solid #99f6e4;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.portfolio-section__projects a:hover {
  color: #0f766e;
  border-color: #0f766e;
}

.portfolio-section__projects p {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0.35rem 0 0;
  text-align: left;
}
</style>
