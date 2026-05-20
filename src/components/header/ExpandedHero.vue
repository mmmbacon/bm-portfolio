<template>
  <header ref="heroEl" class="expanded-hero">
    <SiteIdentity variant="hero" />
    <p class="expanded-hero__tagline">{{ tagline }}</p>
    <p class="expanded-hero__location">{{ locationLabel }}</p>
    <SocialLinks />
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { site } from '../../seo.js';
import SiteIdentity from './SiteIdentity.vue';
import SocialLinks from './SocialLinks.vue';

const tagline = `${site.skills.slice(0, 4).join(' · ')}`;
const locationLabel = computed(() => site.location.replace(', Canada', ''));

const heroEl = ref(null);

defineExpose({
  heroEl,
});
</script>

<style scoped>
.expanded-hero {
  text-align: center;
  padding: 2.5rem 1.5rem 2rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.expanded-hero__tagline {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 0.25rem;
}

.expanded-hero__location {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0 0 0.75rem;
}
</style>
