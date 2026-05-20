<template>
  <header
    ref="barEl"
    class="condensed-bar"
    :class="{ 'condensed-bar--mobile': mobile }"
    :style="style"
    :aria-hidden="ariaHidden"
    :inert="ariaHidden"
  >
    <SiteIdentity variant="bar" />
    <SectionNav v-if="showNav" variant="header" />
    <SocialLinks size="compact" />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import SectionNav from '../SectionNav.vue';
import SiteIdentity from './SiteIdentity.vue';
import SocialLinks from './SocialLinks.vue';

defineProps({
  mobile: {
    type: Boolean,
    default: false,
  },
  showNav: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object,
    default: undefined,
  },
  ariaHidden: {
    type: Boolean,
    default: false,
  },
});

const barEl = ref(null);

defineExpose({
  barEl,
});
</script>

<style scoped>
.condensed-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 1px 12px rgba(15, 23, 42, 0.08);
}

.condensed-bar--mobile {
  position: sticky;
  transform: none;
  opacity: 1;
  pointer-events: auto;
}

@media (max-width: 767px) {
  .condensed-bar {
    position: sticky;
    top: 0;
    align-items: center;
  }
}
</style>
