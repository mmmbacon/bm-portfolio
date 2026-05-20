import {
  heroCondensedBarHeight,
  heroIsMobile,
  heroNavHeight,
  heroVisibleHeight,
} from '../composables/heroLayout.js';

const FALLBACK_BAR_HEIGHT = 72;
const FALLBACK_NAV_HEIGHT = 52;
const SCROLL_OFFSET_EXTRA = 16;

/** Pixels to leave above a section when scrolling to an in-page anchor. */
export function getSectionScrollOffset() {
  const barHeight = heroCondensedBarHeight.value || FALLBACK_BAR_HEIGHT;
  const navVisible = !heroIsMobile.value && heroVisibleHeight.value > 0;
  const navHeight = navVisible
    ? heroNavHeight.value || FALLBACK_NAV_HEIGHT
    : 0;

  return barHeight + navHeight + SCROLL_OFFSET_EXTRA;
}

export function syncScrollOffsetCssVar() {
  document.documentElement.style.setProperty(
    '--scroll-offset',
    `${getSectionScrollOffset()}px`,
  );
}
