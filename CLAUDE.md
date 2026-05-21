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

All styling uses Tailwind utility classes. Inter is loaded via `next/font/google` in `_app.page.tsx` and applied at the app wrapper level — pages inherit it without doing anything. Font rendering flags (`antialiased`, `optimizeLegibility`, `font-synthesis: none`) are set on `body` in `global.css` — do not add them per-component.

#### Design tokens

`styles/global.css` defines semantic CSS custom properties for both light and dark mode using the OKLCH color space. A `@theme inline` block maps them to Tailwind utilities:

| Token | Tailwind utility | Purpose |
|-------|-----------------|---------|
| `--background` | `bg-background` | Page background |
| `--surface` | `bg-surface` | Slightly elevated surface (e.g. hover fills) |
| `--surface-raised` | `bg-surface-raised` | Further elevated (e.g. cards) |
| `--border` | `border-border` | Default border color |
| `--text` | `text-text` | Primary text |
| `--text-muted` | `text-text-muted` | Secondary/muted text |
| `--accent` | `bg-accent`, `text-accent` | Brand accent (olive green) |
| `--accent-foreground` | `text-accent-foreground` | Text on accent backgrounds |

**Never use hardcoded Tailwind color classes** (`zinc-*`, `gray-*`, etc.) — always use the semantic tokens above so both themes stay consistent.

Opacity modifiers work with tokens: `bg-accent/20`, `hover:bg-surface`.

#### Light/dark mode

Dark mode is class-based: adding `.dark` to `<html>` activates the dark token values. It is **not** driven by `prefers-color-scheme` alone.

- `pages/_document.page.tsx` contains a blocking inline script that reads `localStorage` and `prefers-color-scheme` before React hydrates, preventing any flash of the wrong theme.
- `components/ThemeToggle.tsx` handles runtime switching — it toggles the `.dark` class on `document.documentElement` and persists the choice to `localStorage`.

#### Mobile

- Viewport meta tag is set in `_document.page.tsx` (`width=device-width, initial-scale=1`).
- Use responsive prefixes for anything that differs between breakpoints: `text-4xl sm:text-6xl`, `gap-8 sm:gap-10`.
- Touch targets should be at least 44px — use `p-3` minimum on interactive icon buttons.
- `-webkit-tap-highlight-color: transparent` is applied globally to `a` and `button` in `global.css`.

### Tests

Test files live next to the code they test (e.g. `pages/index.test.tsx`). Vitest globals (`describe`, `it`, `expect`) are available without imports — configured via `globals: true` in `vitest.config.ts` and `"types": ["vitest/globals"]` in `tsconfig.json`.
