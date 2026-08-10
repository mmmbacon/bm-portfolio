<template>
  <dialog
    ref="dialogRef"
    class="blog-lightbox"
    aria-label="Expanded image"
    @click="onBackdropClick"
    @close="onNativeClose"
  >
    <figure v-if="image" class="blog-lightbox__figure" @click.stop>
      <button
        type="button"
        class="blog-lightbox__close"
        aria-label="Close image"
        @click="close"
      >
        ×
      </button>
      <img
        class="blog-lightbox__image"
        :src="image.src"
        :alt="image.alt"
      >
      <figcaption v-if="image.alt" class="blog-lightbox__caption">
        {{ image.alt }}
      </figcaption>
    </figure>
  </dialog>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue';

const dialogRef = ref(null);
const image = ref(null);

function open(source) {
  if (typeof source === 'string') {
    image.value = { src: source, alt: '' };
  } else if (source instanceof HTMLImageElement) {
    image.value = {
      src: source.currentSrc || source.src,
      alt: source.alt || '',
    };
  } else {
    image.value = {
      src: source.src,
      alt: source.alt || '',
    };
  }

  nextTick(() => {
    dialogRef.value?.showModal();
  });
}

function close() {
  dialogRef.value?.close();
}

function onNativeClose() {
  image.value = null;
}

function onBackdropClick(event) {
  if (event.target === dialogRef.value) {
    close();
  }
}

onBeforeUnmount(() => {
  if (dialogRef.value?.open) {
    close();
  }
});

defineExpose({ open, close });
</script>
