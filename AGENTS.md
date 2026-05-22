# bm-portfolio — Agent Instructions

Personal portfolio site. Vue 3 + Vite, deployed to Vercel.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Lint fix | `npm run lint:fix` |
| Typecheck | `npm run typecheck` |
| Check (lint + typecheck) | `npm run check` |
| Tests | `npm run test:ci` |
| Build | `npm run build` |
| Preview build | `npm run preview` |

After completing a task, always run `npm run check`. Use `npm run lint:fix` for auto-fixable lint issues.

Node **18+** (see `.nvmrc`). Use `nvm use` before installing.

## Architecture

```
src/
  views/          # Route-level pages (HomeView, BlogListView, BlogPostView)
  components/     # Reusable UI (Section, SiteHeader, header/*)
  composables/    # Shared Vue composition logic
  data/           # Static site content (sections.js)
  lib/            # Utilities (blog parsing, scroll helpers)
  seo.js          # Meta tags, OG/Twitter, JSON-LD
content/blog/     # Markdown blog posts (frontmatter + body)
public/           # Static assets
```

- Router: `src/router/index.js`
- Global styles: `src/styles/main.scss`
- Site sections and copy: `src/data/sections.js` — update here for portfolio content changes
- Blog posts: add `.md` files under `content/blog/`; loaded via `src/lib/blog.js`

## Conventions

- Vue 3 Composition API with `<script setup>` where existing files use it.
- JavaScript and TypeScript coexist; follow the language already used in each file.
- SEO: set `VITE_SITE_URL` for production canonical URLs (see `.env.example` and `README.md`).
- Keep changes minimal and match existing component/style patterns.
- Do not commit or push unless the user requests it.

## Testing & CI

- Vitest for unit tests (`*.test.js` alongside source).
- GitHub Actions: `static-check` runs `npm run check`; `CI` runs `npm run test:ci`.
