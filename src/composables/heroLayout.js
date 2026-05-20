import { computed, ref } from 'vue';

export const heroScrollY = ref(0);
export const heroExpandedHeight = ref(0);
export const heroNavHeight = ref(0);
export const heroCondensedBarHeight = ref(0);
export const heroBarOpacity = ref(0);
export const heroIsMobile = ref(false);

export const heroVisibleHeight = computed(() =>
  Math.max(0, heroExpandedHeight.value - heroScrollY.value),
);

export const heroShowNav = computed(() =>
  !heroIsMobile.value && !heroIsCompactHeader.value && heroVisibleHeight.value > 0,
);

export const heroShowCondensedBar = computed(() =>
  heroIsMobile.value || heroBarOpacity.value > 0 || heroIsCompactHeader.value,
);

export const heroIsCompactHeader = ref(false);
