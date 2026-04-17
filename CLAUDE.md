# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR at http://localhost:5173
npm run build     # Type-check (tsc -b) then bundle with Vite
npm run lint      # Run ESLint
npm run preview   # Preview the production build locally
```

No test runner is configured.

## Architecture

Single-page React 19 app scaffolded with Vite + TypeScript. The entire UI lives in `src/App.tsx` — one component with two `<section>` blocks (`#center` for the hero/counter, `#next-steps` for docs/social links). Styles are split between `src/index.css` (global/reset) and `src/App.css` (component-scoped).

SVG icons are sprite-based: the SVG sprite file is served as a static asset at `/icons.svg` (under `public/`) and referenced via `<use href="/icons.svg#<id>">` in the JSX. Static images (hero, logos) are imported directly as ES module assets in `App.tsx`.

TypeScript is configured with two separate `tsconfig` targets: `tsconfig.app.json` for the browser bundle and `tsconfig.node.json` for Vite config files.
