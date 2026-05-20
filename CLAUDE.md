# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Static export to /out
npm test             # Run test suite once
npm run test:watch   # Run tests in watch mode
```

To run a single test file: `npx vitest run pages/index.test.tsx`

## Stack

- **Next.js 16** (Pages Router, static export) — no server-side features, no API routes
- **React 19**, **TypeScript 6** (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config.js`, configured entirely through CSS
- **Vitest** + **React Testing Library** + **jsdom** for tests
- **Vercel** for hosting — auto-deploys on merge to `main`
- **GitHub Actions** (`.github/workflows/ci.yml`) runs the test suite as a required branch protection check, blocking merges on failure

## Key conventions

### Page file extension

`next.config.js` sets `pageExtensions: ["page.tsx"]`. Only `.page.tsx` files are treated as pages — plain `.tsx` files are ignored by the router, which is what allows test files to live next to pages without being served as routes.

### Styling

All styling uses Tailwind utility classes. `styles/global.css` contains only `@import "tailwindcss"`. Inter is loaded via `next/font/google` in `_app.page.tsx` and applied at the app wrapper level — pages inherit it without doing anything.

### Tests

Test files live next to the code they test (e.g. `pages/index.test.tsx`). Vitest globals (`describe`, `it`, `expect`) are available without imports — configured via `globals: true` in `vitest.config.ts` and `"types": ["vitest/globals"]` in `tsconfig.json`.
