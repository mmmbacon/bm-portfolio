import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  heroBarOpacity,
  heroCondensedBarHeight,
  heroExpandedHeight,
  heroIsCompactHeader,
  heroIsMobile,
  heroNavHeight,
  heroScrollY,
  heroVisibleHeight,
} from './heroLayout.js';

const MOBILE_BREAKPOINT = 767;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`;

function mixHex(from, to, amount) {
  const parse = (hex) => {
    const value = parseInt(hex.slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  };

  const [r1, g1, b1] = parse(from);
  const [r2, g2, b2] = parse(to);
  const r = Math.round(r1 + (r2 - r1) * amount);
  const g = Math.round(g1 + (g2 - g1) * amount);
  const b = Math.round(b1 + (b2 - b1) * amount);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function useSiteHeader(emit) {
  const route = useRoute();
  const isMobile = heroIsMobile;
  const expandedHeroRef = ref(null);
  const condensedBarRef = ref(null);
  const fixedNavRef = ref(null);
  const expandedHeroHeight = heroExpandedHeight;
  const navHeight = heroNavHeight;
  const condensedBarHeight = heroCondensedBarHeight;
  const scrollY = heroScrollY;
  const visibleHeroHeight = heroVisibleHeight;

  const isCompactHeader = computed(() => route.meta.headerMode === 'compact');

  const collapseThreshold = computed(() =>
    condensedBarHeight.value + navHeight.value,
  );

  const barOpacity = computed(() => {
    if (isMobile.value || isCompactHeader.value) {
      return 1;
    }

    const threshold = collapseThreshold.value;
    if (!threshold) {
      return 0;
    }

    if (visibleHeroHeight.value >= threshold) {
      return 0;
    }

    const fadeRange = Math.max(condensedBarHeight.value, 1);
    return Math.min(1, (threshold - visibleHeroHeight.value) / fadeRange);
  });

  const spacerHeight = computed(() => {
    if (isMobile.value) {
      return 0;
    }

    if (isCompactHeader.value) {
      return condensedBarHeight.value;
    }

    if (!expandedHeroHeight.value) {
      return 0;
    }

    return expandedHeroHeight.value + navHeight.value;
  });

  const showExpandedHero = computed(() => !isMobile.value && !isCompactHeader.value);

  const showFixedNavLayer = computed(() => !isMobile.value && !isCompactHeader.value);

  const showFixedNav = computed(() =>
    showFixedNavLayer.value && visibleHeroHeight.value > 0,
  );

  const showHeaderNav = computed(() =>
    isMobile.value
    || isCompactHeader.value
    || (barOpacity.value > 0 && !showFixedNav.value),
  );

  const heroShrinkProgress = computed(() => {
    const expanded = expandedHeroHeight.value;
    if (!expanded) {
      return 0;
    }

    return Math.min(1, Math.max(0, 1 - visibleHeroHeight.value / expanded));
  });

  const heroFixedStyle = computed(() => {
    const progress = heroShrinkProgress.value;
    const topColor = mixHex('#f8fafc', '#e2e8f0', progress);
    const bottomColor = mixHex('#f1f5f9', '#cbd5e1', progress);

    return {
      height: `${visibleHeroHeight.value}px`,
      background: `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`,
      visibility: visibleHeroHeight.value > 0 && barOpacity.value < 1 ? 'visible' : 'hidden',
      pointerEvents: visibleHeroHeight.value > 0 && barOpacity.value < 1 ? 'auto' : 'none',
    };
  });

  const navFixedStyle = computed(() => {
    const top = visibleHeroHeight.value;
    const showNav = top > 0;

    return {
      top: `${top}px`,
      visibility: showNav ? 'visible' : 'hidden',
      pointerEvents: showNav ? 'auto' : 'none',
    };
  });

  const heroBarStyle = computed(() => {
    if (isMobile.value || isCompactHeader.value) {
      return undefined;
    }

    const opacity = barOpacity.value;

    return {
      transform: `translateY(${(1 - opacity) * -100}%)`,
      opacity,
      pointerEvents: opacity > 0 ? 'auto' : 'none',
    };
  });

  const condensedBarAriaHidden = computed(() => !isCompactHeader.value && barOpacity.value <= 0);

  watch(barOpacity, (value) => {
    heroBarOpacity.value = value;
  }, { immediate: true });

  watch(isCompactHeader, (value) => {
    heroIsCompactHeader.value = value;
  }, { immediate: true });

  watch(barOpacity, (value) => {
    emit('condensed-change', isMobile.value || value > 0);
  }, { immediate: true });

  function syncMobile() {
    isMobile.value = window.matchMedia(MOBILE_QUERY).matches;
  }

  function handleScroll() {
    scrollY.value = window.scrollY;
  }

  function measureExpandedHero() {
    const heroEl = expandedHeroRef.value?.heroEl;
    if (!heroEl || isMobile.value) {
      return;
    }

    if (window.scrollY === 0 || expandedHeroHeight.value === 0) {
      expandedHeroHeight.value = heroEl.offsetHeight;
    }
  }

  function measureNav() {
    const navEl = fixedNavRef.value?.navEl;
    if (!navEl || isMobile.value) {
      return;
    }

    navHeight.value = navEl.offsetHeight;
  }

  function measureCondensedBar() {
    const barEl = condensedBarRef.value?.barEl;
    if (!barEl) {
      return;
    }

    condensedBarHeight.value = barEl.offsetHeight;
  }

  function measureHeights() {
    measureExpandedHero();
    measureNav();
    measureCondensedBar();
  }

  function onViewportChange() {
    syncMobile();

    if (window.scrollY === 0) {
      measureExpandedHero();
    }

    measureNav();
    measureCondensedBar();
  }

  const mobileMediaQuery = window.matchMedia(MOBILE_QUERY);

  onMounted(async () => {
    await nextTick();
    syncMobile();
    measureHeights();
    requestAnimationFrame(measureHeights);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onViewportChange);
    mobileMediaQuery.addEventListener('change', onViewportChange);
    handleScroll();
  });

  watch(
    () => route.fullPath,
    async () => {
      await nextTick();
      handleScroll();

      if (!isCompactHeader.value && window.scrollY === 0) {
        measureExpandedHero();
      }

      measureNav();
      measureCondensedBar();
    },
  );

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', onViewportChange);
    mobileMediaQuery.removeEventListener('change', onViewportChange);
  });

  return {
    isMobile,
    expandedHeroRef,
    condensedBarRef,
    fixedNavRef,
    spacerHeight,
    showExpandedHero,
    showFixedNavLayer,
    showFixedNav,
    showHeaderNav,
    heroFixedStyle,
    navFixedStyle,
    heroBarStyle,
    condensedBarAriaHidden,
  };
}
