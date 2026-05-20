<template>
  <div class="site-identity" :class="`site-identity--${variant}`">
    <RouterLink class="site-identity__link" to="/" aria-label="Brandon Macdonald home">
      <component :is="nameTag" class="site-identity__name">{{ site.name }}</component>
      <span v-if="variant === 'bar'" class="site-identity__subheading">Full Stack Dev</span>
    </RouterLink>
    <component :is="roleTag" class="site-identity__role">{{ site.jobTitle }}</component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { site } from '../../seo.js';

const props = defineProps({
  variant: {
    type: String,
    default: 'hero',
    validator: (value) => ['hero', 'bar'].includes(value),
  },
});

const nameTag = computed(() => (props.variant === 'hero' ? 'h1' : 'span'));
const roleTag = computed(() => (props.variant === 'hero' ? 'p' : 'span'));
</script>

<style scoped>
.site-identity__link {
  color: inherit;
  text-decoration: none;
}

.site-identity--hero {
  text-align: center;
}

.site-identity--hero .site-identity__name {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem;
  color: #0f172a;
}

.site-identity--hero .site-identity__role {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0f766e;
  margin: 0 0 0.5rem;
}

.site-identity--bar {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
  flex: 1;
}

.site-identity--bar .site-identity__name {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #0f172a;
  flex-shrink: 0;
}

.site-identity--bar .site-identity__subheading {
  display: none;
}

.site-identity--bar .site-identity__role {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1023px) {
  .site-identity--bar {
    align-items: flex-start;
  }

  .site-identity--bar .site-identity__link {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
  }

  .site-identity--bar .site-identity__subheading {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #0f766e;
  }

  .site-identity--bar .site-identity__role {
    display: none;
  }
}

@media (min-width: 1024px) {
  .site-identity--bar .site-identity__role::before {
    content: '·';
    margin-right: 0.65rem;
    color: #cbd5e1;
  }
}
</style>
