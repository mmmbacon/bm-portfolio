# bm-portfolio

Personal portfolio site built with **Vue 3** and **Vite**.

## Setup

```bash
nvm use
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push to GitHub (`mmmbacon/bm-portfolio`).
2. Import at [vercel.com/new](https://vercel.com/new) — Vercel detects Vite automatically.
3. Or use the CLI:

```bash
npx vercel login
npx vercel --prod
```

Build settings (auto-detected):

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node.js:** 20.x (see `.nvmrc`)

## SEO

The build emits meta tags, Open Graph / Twitter cards, JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`), `robots.txt`, `sitemap.xml`, and per-route HTML shells for `/blog`, blog posts, and `/projects/nextgen`.

Production builds read [`/.env.production`](.env.production) so canonical URLs use `https://brandonmacdonald.dev`. Override locally or in Vercel if needed:

```bash
# .env.local or Vercel environment variable
VITE_SITE_URL=https://brandonmacdonald.dev
```
