import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Section from './Section.vue';

describe('Section', () => {
  it('renders title and description', () => {
    const wrapper = mount(Section, {
      props: {
        sectionId: 'about',
        title: 'About',
        description: 'Full stack engineer in Calgary.',
        url: '/about.png',
      },
    });

    expect(wrapper.find('.portfolio-section__title').text()).toBe('About');
    expect(wrapper.find('.portfolio-section__description').text()).toBe(
      'Full stack engineer in Calgary.',
    );
  });

  it('renders project links when links prop is true', () => {
    const wrapper = mount(Section, {
      props: {
        sectionId: 'projects',
        title: 'Projects',
        description: 'Selected work.',
        url: '/projects.png',
        links: true,
      },
    });

    expect(wrapper.find('.portfolio-section__projects').exists()).toBe(true);
    expect(wrapper.find('.portfolio-section__projects a').attributes('href')).toBe(
      'https://github.com/mmmbacon/trakr',
    );
  });
});
