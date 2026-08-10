import { createRouter, createWebHistory } from 'vue-router';
import { SECTION_SCROLL_OFFSET } from '../lib/scrollOffset.js';
import BlogListView from '../views/BlogListView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import HomeView from '../views/HomeView.vue';
import NextGenProjectView from '../views/NextGenProjectView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/nextgen',
      name: 'project-nextgen',
      component: NextGenProjectView,
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
        top: SECTION_SCROLL_OFFSET,
        behavior: 'smooth',
      };
    }

    return { top: 0 };
  },
});
