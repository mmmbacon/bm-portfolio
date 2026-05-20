<template>
  <HeaderSpacer v-if="spacerHeight" :height="spacerHeight" />

  <div
    v-if="showExpandedHero"
    class="hero-fixed"
    :style="heroFixedStyle"
  >
    <ExpandedHero ref="expandedHeroRef" />
  </div>

  <FixedSectionNav
    v-if="showFixedNavLayer"
    ref="fixedNavRef"
    :style="navFixedStyle"
  />

  <CondensedBar
    ref="condensedBarRef"
    :mobile="isMobile"
    :show-nav="showHeaderNav"
    :style="heroBarStyle"
    :aria-hidden="condensedBarAriaHidden"
  />
</template>

<script setup>
import CondensedBar from './header/CondensedBar.vue';
import ExpandedHero from './header/ExpandedHero.vue';
import FixedSectionNav from './header/FixedSectionNav.vue';
import HeaderSpacer from './header/HeaderSpacer.vue';
import { useSiteHeader } from '../composables/useSiteHeader.js';

const emit = defineEmits(['condensed-change']);

const {
  isMobile,
  expandedHeroRef,
  condensedBarRef,
  fixedNavRef,
  spacerHeight,
  showExpandedHero,
  showFixedNavLayer,
  showHeaderNav,
  heroFixedStyle,
  navFixedStyle,
  heroBarStyle,
  condensedBarAriaHidden,
} = useSiteHeader(emit);
</script>

<style scoped>
.hero-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
}
</style>
