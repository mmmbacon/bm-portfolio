import { createRouter, createWebHistory } from 'vue-router';
import { getSectionScrollOffset } from '../lib/scrollOffset.js';
import BlogListView from '../views/BlogListView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import HomeView from '../views/HomeView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogListView,
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostView,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: getSectionScrollOffset(),
        behavior: 'smooth',
      };
    }

    return { top: 0 };
  },
});
