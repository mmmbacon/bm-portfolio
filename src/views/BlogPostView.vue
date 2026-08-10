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
      <div class="blog-prose" @click="onProseClick" v-html="post.html" />
    </article>

    <div v-else class="blog-page__inner">
      <p class="blog-page__eyebrow">Not found</p>
      <h2 class="blog-page__title">Post not found</h2>
      <p class="blog-page__intro">
        This post does not exist, or it is not published yet.
      </p>
    </div>

    <ImageLightbox ref="lightboxRef" />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ImageLightbox from '../components/ImageLightbox.vue';
import { getPostBySlug } from '../lib/blog.js';
import { getBlogPostMeta, site } from '../seo.js';
import '../styles/blog.scss';

const route = useRoute();
const post = computed(() => getPostBySlug(String(route.params.slug || '')));
const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || window.location.origin;
const pageMeta = computed(() => {
  if (!post.value) {
    return {
      title: `Post not found | ${site.name}`,
      description: 'This blog post could not be found.',
      canonicalUrl: `${siteUrl}/blog`,
      ogType: 'website',
      ogImage: site.ogImage,
      jsonLd: null,
    };
  }

  return getBlogPostMeta(post.value, siteUrl);
});

const lightboxRef = ref(null);

function onProseClick(event) {
  const img = event.target.closest('img');
  if (!img || !event.currentTarget.contains(img)) {
    return;
  }

  lightboxRef.value?.open(img);
}

watch(
  () => route.params.slug,
  () => {
    lightboxRef.value?.close();
  },
);

useHead({
  title: computed(() => pageMeta.value.title),
  link: [{ rel: 'canonical', href: computed(() => pageMeta.value.canonicalUrl) }],
  meta: [
    { name: 'description', content: computed(() => pageMeta.value.description) },
    { property: 'og:title', content: computed(() => pageMeta.value.title) },
    { property: 'og:description', content: computed(() => pageMeta.value.description) },
    { property: 'og:url', content: computed(() => pageMeta.value.canonicalUrl) },
    { property: 'og:type', content: computed(() => pageMeta.value.ogType) },
    { property: 'og:image', content: computed(() => pageMeta.value.ogImage) },
  ],
  script: computed(() =>
    pageMeta.value.jsonLd
      ? [
          {
            type: 'application/ld+json',
            children: JSON.stringify(pageMeta.value.jsonLd),
          },
        ]
      : [],
  ),
});
</script>
