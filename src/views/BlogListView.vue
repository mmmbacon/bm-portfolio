<template>
  <div id="content" class="blog-page">
    <div class="blog-page__inner">
      <p class="blog-page__eyebrow">Blog</p>
      <h2 class="blog-page__title">Thoughts and progress</h2>
      <p class="blog-page__intro">
        Short notes on the documents, tools, and systems I am shaping as I work through them.
      </p>

      <ul v-if="posts.length" class="blog-list">
        <li v-for="post in posts" :key="post.slug" class="blog-card">
          <h3 class="blog-card__title">
            <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
          </h3>
          <div class="blog-meta">
            <time v-if="post.date" :datetime="post.date">{{ post.dateLabel }}</time>
            <ul v-if="post.tags.length" class="blog-tags" aria-label="Post tags">
              <li v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</li>
            </ul>
          </div>
          <p v-if="post.description" class="blog-page__description">
            {{ post.description }}
          </p>
        </li>
      </ul>

      <p v-else class="blog-empty">No published posts yet.</p>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { RouterLink } from 'vue-router';
import { getAllPosts } from '../lib/blog.js';
import { getBlogListMeta } from '../seo.js';
import '../styles/blog.scss';

const posts = getAllPosts();
const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || window.location.origin;
const pageMeta = getBlogListMeta(siteUrl);

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
});
</script>
