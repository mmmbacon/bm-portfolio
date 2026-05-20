<template>
  <div id="content" class="sections">
    <Section
      v-for="(section, index) in sections"
      :key="section.title"
      :section-id="sectionId(section.title)"
      :url="section.url"
      :title="section.title"
      :description="section.description"
      :highlights="section.highlights"
      :links="section.links"
      :lazy-load="index > 0"
      :reverse="index % 2 === 1"
    />
  </div>
</template>

<script setup>
import Section from '../components/Section.vue';
import { sectionId, sections } from '../data/sections.js';
</script>

<style scoped>
.sections {
  background: #fff;
  padding: 1.25rem 0 2.5rem;
}
</style>
