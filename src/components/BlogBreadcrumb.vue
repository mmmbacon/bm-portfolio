<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb__list">
      <li v-for="(item, index) in items" :key="item.label" class="breadcrumb__item">
        <RouterLink v-if="item.to" :to="item.to">{{ item.label }}</RouterLink>
        <span v-else aria-current="page">{{ item.label }}</span>
        <span
          v-if="index < items.length - 1"
          class="breadcrumb__separator"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
