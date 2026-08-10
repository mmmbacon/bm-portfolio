<template>
  <div id="content" class="blog-page">
    <article class="blog-page__inner">
      <p class="blog-page__eyebrow">Project</p>
      <h2 class="blog-page__title">NextGen</h2>
      <p class="blog-page__description">
        A database-first 3D plant design system for oil and gas engineering.
        The 3D model is the source of truth; drawings and diagrams are derived
        from it.
      </p>

      <ul class="project-links" aria-label="Project links">
        <li>
          <a
            href="https://github.com/mmmbacon/nextgen"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a>
        </li>
        <li>
          <RouterLink to="/blog/building-nextgen">Building NextGen (blog)</RouterLink>
        </li>
      </ul>

      <div class="blog-prose">
        <button
          type="button"
          class="project-figure"
          @click="openImage(hero)"
        >
          <img
            :src="hero.src"
            :alt="hero.alt"
            loading="eager"
            decoding="async"
          >
        </button>

        <h2>What it is</h2>
        <p>
          NextGen is a plant design system aimed at the same problem domain as
          heavyweight industry tools, built on a modern stack. Engineers design
          primarily in 3D with discipline-focused tools. Every object lives in a
          spatial-graph PostgreSQL/PostGIS database. Parametric geometry is
          regenerated for display; OpenCascade (via Rust) handles commit-time
          solids.
        </p>
        <p>
          A companion web dashboard covers Spec Manager catalogs and PFD/P&amp;ID
          editing with DEXPI import/export. The long-term direction includes
          in-product production drawings and modular package workflows — Phase 1
          is the 3D modeling MVP, roughly halfway there.
        </p>

        <h2>Stack</h2>
        <ul>
          <li><strong>Desktop:</strong> Electron, React, Three.js</li>
          <li><strong>Dashboard:</strong> React, Vite, React Flow</li>
          <li><strong>API:</strong> NestJS, TypeORM</li>
          <li><strong>Data:</strong> PostgreSQL 15, PostGIS 3.4</li>
          <li><strong>Geometry:</strong> Rust FFI + OpenCascade (OCCT)</li>
        </ul>

        <h2>What works today</h2>
        <ul>
          <li>Piping: draw pipe, auto-route, elbows, tees, flanges, weldolets, supports</li>
          <li>Structural: beams, columns, plates, foundations, end/base plates, stiffeners, copes</li>
          <li>Vessel: parametric shells, heads, supports, and nozzle schedules</li>
          <li>Areas, equipment volumes, UCS/grids, selection, snapping, and measure</li>
          <li>Spec Manager (CISC + piping packs) and PFD/P&amp;ID with DEXPI 1.4</li>
        </ul>

        <h2>Screenshots</h2>
        <p>Click any image to expand it. More walkthrough detail is in the blog post.</p>

        <div class="project-gallery">
          <button
            v-for="shot in gallery"
            :key="shot.src"
            type="button"
            class="project-figure"
            @click="openImage(shot)"
          >
            <img
              :src="shot.src"
              :alt="shot.alt"
              loading="lazy"
              decoding="async"
            >
          </button>
        </div>

        <h2>Status</h2>
        <p>
          Electrical placement, modular package design, rule/clearance management,
          full IFC export, and bidirectional diagram ↔ 3D linking are still thin
          or on the roadmap. Near-term work focuses on finishing piping joints,
          richer vessel nozzle UX, structural connections, and tightening specs
          against placement.
        </p>
      </div>
    </article>

    <ImageLightbox ref="lightboxRef" />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import ImageLightbox from '../components/ImageLightbox.vue';
import { getNextGenMeta, NEXTGEN_HERO_PATH } from '../seo.js';
import '../styles/blog.scss';

const lightboxRef = ref(null);

const hero = {
  src: NEXTGEN_HERO_PATH,
  alt: 'NextGen desktop shell with 3D viewport, discipline toolbar, and object tree',
};

const gallery = [
  {
    src: '/blog/nextgen/02-piping-run.png',
    alt: 'Piping run with fittings in the NextGen viewport',
  },
  {
    src: '/blog/nextgen/03-auto-route-complete.png',
    alt: 'Completed auto-routed pipe run between vessels',
  },
  {
    src: '/blog/nextgen/05-beam-placement.png',
    alt: 'Structural beam placement on a grid with elevation markers',
  },
  {
    src: '/blog/nextgen/06-vessel-2.png',
    alt: 'Parametric vessel with nozzles in the model',
  },
  {
    src: '/blog/nextgen/09-spec-manager.png',
    alt: 'Spec Manager in the NextGen dashboard',
  },
  {
    src: '/blog/nextgen/10-pid-diagram.png',
    alt: 'PFD or P&ID diagram editor',
  },
];

function openImage(shot) {
  lightboxRef.value?.open(shot);
}

const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || window.location.origin;
const pageMeta = getNextGenMeta(siteUrl);

useHead({
  title: pageMeta.title,
  link: [{ rel: 'canonical', href: pageMeta.canonicalUrl }],
  meta: [
    { name: 'description', content: pageMeta.description },
    { property: 'og:title', content: pageMeta.title },
    { property: 'og:description', content: pageMeta.description },
    { property: 'og:url', content: pageMeta.canonicalUrl },
    { property: 'og:type', content: pageMeta.ogType },
    { property: 'og:image', content: pageMeta.ogImage },
  ],
  script: computed(() => [
    {
      type: 'application/ld+json',
      children: JSON.stringify(pageMeta.jsonLd),
    },
  ]),
});
</script>
