# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Static export to /out (Next.js output: 'export' mode)
npm run start    # Serve the production build
```

There is no test suite or linter configured.

## Architecture

This is a Next.js portfolio site that uses **static export** (`output: 'export'` in `next.config.js`), so there are no server-side features — no API routes, no `getServerSideProps`. All pages are statically generated at build time.

### Page file convention

Only files with the `.page.tsx` extension are treated as pages (`pageExtensions: ["page.tsx"]` in `next.config.js`). Standard Next.js `pages/foo.tsx` files are ignored — new pages must use `.page.tsx`.

### Layout pattern

Every page wraps its content in `<Layout>`, which provides the full-page container and `<Navbar>`. Pages set their own `<Head><title>` inside `<Layout>`.

### Responsive navbar

`Navbar` detects mobile via a `resize` event listener (`window.innerWidth <= 767`). On mobile it renders a `Menu` overlay instead of inline links. The breakpoint (767px) matches the CSS media queries in `layout.module.css` and `navbar.module.css`.

### Content / copy

Page copy is kept in co-located `messages.tsx` files (e.g. `pages/about/messages.tsx`) rather than inline in the component. Add or edit text there rather than touching the page component.

### Styling

- Global base styles live in `styles/global.css` (background colour `#f8dfcb`, Montserrat via `next/font/google` in `_app.page.tsx`).
- Component-level styles use CSS Modules (`.module.css` files next to each component).
- `Menu` uses inline `styles` objects defined at the bottom of `components/menu/index.tsx` rather than a CSS Module — this is intentional for its full-screen overlay positioning.
