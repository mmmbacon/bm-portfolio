<template>
  <div
    v-if="height"
    class="header-spacer"
    :style="{ height: `${height}px` }"
    aria-hidden="true"
  />
</template>

<script setup>
defineProps({
  height: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.header-spacer {
  overflow-anchor: none;
}
</style>
