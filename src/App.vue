<template>
  <div class="page">
    <SiteHeader @condensed-change="isHeaderCondensed = $event" />

    <main class="page-main">
      <div v-if="breadcrumbItems" class="page-breadcrumb-bar">
        <BlogBreadcrumb :items="breadcrumbItems" />
      </div>

      <noscript>
        <div class="noscript">
        <h1>Brandon Macdonald</h1>
        <p>
        Brandon Macdonald is a full stack software engineer and technical lead in Calgary,
        AB.
        </p>
        <nav aria-label="Page sections">
        <ul>
        <li><a href="/#about-me">About Me</a></li>
        <li><a href="/#front-end">Front End</a></li>
        <li><a href="/#back-end">Back End</a></li>
        <li><a href="/#experience">Experience</a></li>
        <li><a href="/#projects">Projects</a></li>
        <li><a href="/blog">Blog</a></li>
        </ul>
        </nav>
        </div>
      </noscript>

      <RouterView />

      <footer class="page-footer">
        <p>
          &copy; {{ currentYear }}
          <a href="mailto:bmacdonald1986@gmail.com">{{ site.name }}</a>. Calgary, AB.
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BlogBreadcrumb from './components/BlogBreadcrumb.vue';
import SiteHeader from './components/SiteHeader.vue';
import { getPostBySlug } from './lib/blog.js';
import { site } from './seo.js';
import './styles/blog.scss';

const route = useRoute();
const currentYear = new Date().getFullYear();
const isHeaderCondensed = ref(false);

function formatSlug(slug) {
  return String(slug)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const breadcrumbItems = computed(() => {
  if (route.name === 'blog') {
    return [
      { label: 'Home', to: '/' },
      { label: 'Blog' },
    ];
  }

  if (route.name === 'blog-post') {
    const post = getPostBySlug(String(route.params.slug || ''));

    return [
      { label: 'Home', to: '/' },
      { label: 'Blog', to: '/blog' },
      { label: post?.title || formatSlug(route.params.slug) },
    ];
  }

  return null;
});
</script>

<style scoped>
.page {
  min-height: 100vh;
}

.page-main {
  min-width: 0;
}

.page-breadcrumb-bar {
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  background: #f8fafc;
  padding: 0.85rem 1.5rem;
}

.page-breadcrumb-bar .breadcrumb {
  max-width: 760px;
  margin: 0 auto;
}

.page-footer {
  padding: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #94a3b8;
  background: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
}

.page-footer p {
  margin: 0;
}

.page-footer a {
  color: #0f766e;
  text-decoration: none;
}

.page-footer a:hover {
  text-decoration: underline;
}
</style>

<style>
.noscript {
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  color: #0f172a;
}

.noscript ul {
  padding-left: 1.25rem;
}

.noscript a {
  color: #0f766e;
}
</style>
