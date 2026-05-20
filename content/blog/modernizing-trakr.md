---
title: Modernizing Trakr
description: A phased upgrade of my job-application tracker from Create React App and Rails 6 to Vite, TypeScript, MUI 6, and Rails 7.2 — with CI, tests, and a deploy path that actually holds up.
date: 2026-05-20
published: true
tags: [trakr, react, rails, typescript, vite, portfolio]
---

# Modernizing Trakr

[Trakr](https://github.com/mmmbacon/trakr) is a job-application tracker I built with a friend during a bootcamp project while at Lighthouse labs. It worked, but by 2026 it had accumulated the kind of debt you expect from a learning codebase: Create React App on React 17, Material UI v4, JavaScript everywhere, Rails 6.1, no CI, and a dev server with severely outdated environment variables.

I wanted it back in my portfolio as something I could demo, So I modernized it in five phases instead of one giant rewrite.

## Where I started

The app is a monorepo: a React frontend and a Rails API, deployed to Vercel and Fly.io with PostgreSQL. Here is a summary of the issues I identified from the initial build:

| Area       | Before                           | Problem                                       |
| ---------- | -------------------------------- | --------------------------------------------- |
| Frontend   | CRA, React 17, JS                | OpenSSL workaround, slow builds               |
| UI         | Material UI v4                   | Unmaintained, peer-dep friction with React 18 |
| Routing    | React Router v5                  | Fine, but tied to the old stack               |
| Charts     | DevExpress + MUI 4 bindings      | No clean path to modern MUI                   |
| Backend    | Rails 6.1                        | Behind on defaults and support                |
| Tests & CI | Stubs, nothing in GitHub Actions | Nothing meaningful ran on PRs                 |

My goal was to modernize the stack: Vite, React 18, TypeScript, MUI 6, React Router 6, Rails 7.2, without breaking the deployment entirely.

## Phase 1 — CI first

I started with GitHub Actions, not framework upgrades. If I was going to touch everything, I needed a green pipeline on the _current_ code first, then tighten it as each phase landed. This is a commonly accepted approach in software development which gives you confidence while upgrading your codebase. If tests pass you're golden.  

I added two jobs:

- **API tests** — Postgres 14 service, Ruby 3.3.11, `rails db:prepare` and `rails test`
- **Web CI** — initially just `npm ci` and a production build

Along the way I fixed real issues CI surfaced: placeholder fixture passwords, stub controller tests, and a syntax bug in the jobs controller that would have blocked stricter parsing. I also added root npm scripts (`test:api`, and later `lint:web`, `typecheck:web`, `test:web`) so local runs match CI.

Getting CI in place early turned every later phase into “make the existing checks pass again” instead of “hope it works." This is something of value I have learned over the years. Tests drive success. 

## Phase 2 — Rails 7.2

The API upgrade was the most contained slice. I bumped the Gemfile to Rails 7.2, ran `app:update`, set `config.load_defaults 7.2`, and re-ran the test suite locally and in CI.

Docker and Fly.io configs needed a quick sanity check — health checks still hit `/api/logged_in`, credentials and secrets docs stayed accurate, but the API surface thankfully did not need a redesign. That was the point of doing backend and frontend upgrades separately.

## Phase 3 — Vite and React 18

I replaced Create React App with **Vite 6** and **React 18** (`createRoot`, Strict Mode). I moved the entry to `main.tsx`, added TypeScript project config, and swapped `REACT_APP_*` env vars for `VITE_*`. The Vite dev server proxies `/api` to Rails on port 3000, same behaviour as the old `setupProxy.js`, without the CRA baggage...

I removed `react-scripts`, the OpenSSL legacy flag, and the old public `index.html` pattern. Vitest replaced Jest scaffolding. MUI v4 stayed temporarily. Phase 4 was a large cutover so I felt this was as far as I wanted to go. I will keep going on UI improvements down the road and likele refactor some React components. 

The app compiled and ran in demo mode after this phase, but console noise from React 18 Strict Mode exposed bugs that had been hiding for years (more on that below).

## Phase 4 — TypeScript, Router 6, and MUI 6

This was the bulk of the work — roughly sixty percent of the total effort.

Most of this phase was rewriting the frontend in place:

**TypeScript.** I moved the whole app from JavaScript to TypeScript so data shapes and state are explicit instead of guessed at runtime.

**Routing.** I updated how pages link together so the dashboard, search, profile, and stats views share one layout instead of repeating the same sidebar on every screen.

**UI library.** I upgraded to the current version of Material UI, refreshed the date pickers and charts, and cleaned up styling that had been spread across old patterns.

**Bug fixes.** React 18 surfaced a couple of hidden crashes in the job modal and job cards — patterns that used to slip by now fail loudly in development, so I fixed those properly.

**Layout.** The sidebar was sitting on top of the kanban board instead of beside it. I reworked the page structure so the navigation and main content sit side by side and scroll correctly on smaller screens.

## Phase 5 — CI hardening and docs

With the stack settled, I closed the loop on tooling and documentation.

- Added **ESLint** (flat config, TypeScript + React Hooks rules) and wired `npm run lint` into the Web CI job
- Final pipeline: `npm ci` → lint → typecheck → test → build
- Updated the root **README** with a CI badge, architecture diagram, env var tables, Node 22 prerequisites, and a production deploy checklist
- Documented the Postgres port difference (55432 locally vs 5432 in CI) so future me does not wonder why tests pass in one place and fail in another

Demo mode still works end-to-end: `VITE_DEMO_MODE=true` on Vercel, sample jobs loaded locally, API proxied same-origin in production via `vercel.json` rewrites to Fly.

## What it looks like now

```
Browser → Vercel (Vite static app) → /api/* rewrite → Fly.io (Rails 7.2) → Postgres
```

Locally: `npm run dev` starts Vite on 8080 and Rails on 3000. Nice.

## What’s next

The modernization plan is complete for what I set out to do. Reasonable follow-ups — not urgent — include Playwright E2E tests, RuboCop on the API, and maybe splitting the MUI bundle with lazy routes if the production chunk size bothers me.

For now, Trakr is a project I am happy to link from this site: current tooling, green CI, and a demo that actually loads.
