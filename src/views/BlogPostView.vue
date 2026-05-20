<template>
  <div id="content" class="blog-page">
    <article v-if="post" class="blog-page__inner">
      <p class="blog-page__eyebrow">Blog</p>
      <h2 class="blog-page__title">{{ post.title }}</h2>
      <div class="blog-meta">
        <time v-if="post.date" :datetime="post.date">{{ post.dateLabel }}</time>
        <ul v-if="post.tags.length" class="blog-tags" aria-label="Post tags">
          <li v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</li>
        </ul>
      </div>
      <p v-if="post.description" class="blog-page__description">
        {{ post.description }}
      </p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="blog-prose" v-html="post.html" />
    </article>

    <div v-else class="blog-page__inner">
      <p class="blog-page__eyebrow">Not found</p>
      <h2 class="blog-page__title">Post not found</h2>
      <p class="blog-page__intro">
        This post does not exist, or it is not published yet.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { getPostBySlug } from '../lib/blog.js';
import { getBlogPostJsonLd, site } from '../seo.js';
import '../styles/blog.scss';

const route = useRoute();
const post = computed(() => getPostBySlug(String(route.params.slug || '')));
const title = computed(() => (post.value ? `${post.value.title} | ${site.name}` : `Post not found | ${site.name}`));
const description = computed(() =>
  post.value?.description || 'This blog post could not be found.',
);
const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || window.location.origin;
const canonicalUrl = computed(() =>
  post.value ? `${siteUrl}/blog/${post.value.slug}` : `${siteUrl}/blog`,
);

useHead({
  title,
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:type', content: 'article' },
  ],
  script: computed(() =>
    post.value
      ? [
          {
            type: 'application/ld+json',
            children: JSON.stringify(getBlogPostJsonLd(post.value, siteUrl)),
          },
        ]
      : [],
  ),
});
</script>
