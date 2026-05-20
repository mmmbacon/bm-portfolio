<template>
  <nav class="social-links" :class="`social-links--${size}`" aria-label="Social links">
    <a
      href="https://github.com/mmmbacon"
      target="_blank"
      rel="noopener noreferrer me"
      aria-label="GitHub profile"
    >
      <img
        src="/img/GitHub-Mark-64px.png"
        alt=""
        class="social-links__icon social-links__icon--github"
      />
    </a>
    <a
      href="https://www.linkedin.com/in/brandon-m-macdonald/"
      target="_blank"
      rel="noopener noreferrer me"
      aria-label="LinkedIn profile"
    >
      <img
        src="/img/icons8-linkedin-50.png"
        alt=""
        class="social-links__icon social-links__icon--social"
      />
    </a>
    <a :href="`mailto:${site.email}`" aria-label="Email Brandon Macdonald">
      <img
        src="/img/icons8-secured-letter-50.png"
        alt=""
        class="social-links__icon social-links__icon--social"
      />
    </a>
  </nav>
</template>

<script setup>
import { site } from '../../seo.js';

defineProps({
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'compact'].includes(value),
  },
});
</script>

<style scoped>
.social-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-links--default {
  justify-content: center;
}

.social-links--compact {
  justify-content: flex-end;
  flex-shrink: 0;
  gap: 0.5rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
}

.social-links--default a {
  width: 44px;
  height: 44px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.social-links--default a:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
}

.social-links--compact a {
  width: 36px;
  height: 36px;
}

.social-links__icon {
  display: block;
  width: auto;
}

.social-links--default .social-links__icon--github {
  height: 22px;
}

.social-links--default .social-links__icon--social {
  height: 25px;
}

.social-links--compact .social-links__icon--github {
  height: 18px;
}

.social-links--compact .social-links__icon--social {
  height: 20px;
}
</style>
