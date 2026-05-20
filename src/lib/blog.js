import MarkdownIt from 'markdown-it';
import { parse as parseYaml } from 'yaml';

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

const modules = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

function normalizeDate(value) {
  if (!value) {
    return '';
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
}

function formatDate(value) {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.map((tag) => String(tag)).filter(Boolean);
}

function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: rawContent };
  }

  return {
    data: parseYaml(match[1]) ?? {},
    content: match[2],
  };
}

function parsePost(path, rawContent) {
  const { content, data } = parseFrontmatter(rawContent);
  const date = normalizeDate(data.date);
  const slug = slugFromPath(path);

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date,
    dateLabel: formatDate(date),
    published: data.published === true,
    tags: normalizeTags(data.tags),
    html: markdown.render(content),
  };
}

const posts = Object.entries(modules)
  .map(([path, rawContent]) => parsePost(path, rawContent))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() {
  return posts.filter((post) => post.published || !import.meta.env.PROD);
}

export function getPublishedPosts() {
  return posts.filter((post) => post.published);
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug);
}
