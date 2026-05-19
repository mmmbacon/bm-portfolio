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

The build emits meta tags, Open Graph / Twitter cards, JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`), `robots.txt`, and `sitemap.xml`.

Set your production URL for canonical links and social previews:

```bash
# .env or Vercel environment variable
VITE_SITE_URL=https://your-domain.com
```

If unset on Vercel, `VERCEL_URL` is used automatically.
