<template>
  <div ref="navEl" class="fixed-section-nav" :style="style">
    <SectionNav variant="bar" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionNav from '../SectionNav.vue';

defineProps({
  style: {
    type: Object,
    default: undefined,
  },
});

const navEl = ref(null);

defineExpose({
  navEl,
});
</script>

<style scoped>
.fixed-section-nav {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 11;
  background: #fff;
}
</style>
