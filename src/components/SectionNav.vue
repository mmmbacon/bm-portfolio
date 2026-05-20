<template>
  <nav
    class="section-nav"
    :class="`section-nav--${variant}`"
    aria-label="Page sections"
  >
    <div class="section-nav__links section-nav__links--desktop">
      <RouterLink
        v-for="section in sections"
        :key="section.title"
        :to="{ path: '/', hash: `#${sectionId(section.title)}` }"
      >
        {{ section.title }}
      </RouterLink>
      <RouterLink to="/blog">Blog</RouterLink>
    </div>

    <div ref="menuRef" class="section-nav__menu">
      <button
        type="button"
        class="section-nav__toggle"
        :aria-expanded="isOpen"
        :aria-controls="dropdownId"
        @click="toggleMenu"
      >
        Sections
        <span class="section-nav__chevron" aria-hidden="true" />
      </button>

      <div
        v-show="isOpen"
        :id="dropdownId"
        class="section-nav__dropdown"
      >
        <RouterLink
          v-for="section in sections"
          :key="section.title"
          :to="{ path: '/', hash: `#${sectionId(section.title)}` }"
          @click="closeMenu"
        >
          {{ section.title }}
        </RouterLink>
        <RouterLink to="/blog" @click="closeMenu">Blog</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref, useId, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { sectionId, sections } from '../data/sections.js';

defineProps({
  variant: {
    type: String,
    default: 'bar',
    validator: (value) => ['bar', 'header'].includes(value),
  },
});

const route = useRoute();
const dropdownId = `section-nav-dropdown-${useId()}`;
const isOpen = ref(false);
const menuRef = ref(null);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

function onDocumentClick(event) {
  if (!menuRef.value?.contains(event.target)) {
    closeMenu();
  }
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
});

watch(
  () => route.fullPath,
  () => {
    closeMenu();
  },
);
</script>

<style scoped>
.section-nav a {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.section-nav a:hover,
.section-nav a.router-link-active {
  color: #0f766e;
}

.section-nav__links--desktop {
  display: none;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.section-nav__menu {
  position: relative;
}

.section-nav__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 0.375rem;
  background: #fff;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
}

.section-nav__toggle:hover,
.section-nav__toggle[aria-expanded='true'] {
  border-color: rgba(15, 118, 110, 0.35);
  color: #0f766e;
}

.section-nav__chevron {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid currentColor;
  transition: transform 0.2s ease;
}

.section-nav__toggle[aria-expanded='true'] .section-nav__chevron {
  transform: rotate(180deg);
}

.section-nav__dropdown {
  position: absolute;
  top: calc(100% + 0.35rem);
  right: 0;
  z-index: 110;
  display: flex;
  flex-direction: column;
  min-width: 11rem;
  padding: 0.35rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
}

.section-nav__dropdown a {
  display: block;
  padding: 0.55rem 0.75rem;
  border-radius: 0.35rem;
}

.section-nav__dropdown a:hover,
.section-nav__dropdown a.router-link-active {
  background: #f0fdfa;
}

.section-nav--bar {
  display: flex;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: #fff;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.section-nav--header {
  order: 2;
  margin: 0 0.75rem 0 auto;
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .section-nav--header {
    margin-right: 0.25rem;
  }
}

@media (min-width: 768px) {
  .section-nav__links--desktop {
    display: flex;
  }

  .section-nav__menu {
    display: none;
  }

  .section-nav--bar {
    gap: 0.85rem;
  }

  .section-nav--header {
    display: flex;
    align-items: center;
    flex-shrink: 1;
    min-width: 0;
    margin: 0 0.75rem 0 auto;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .section-nav--header::-webkit-scrollbar {
    display: none;
  }

  .section-nav--header .section-nav__links--desktop {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
}
</style>
