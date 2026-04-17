# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start dev server with HMR at http://localhost:5173
npm run build         # Type-check (tsc -b) then bundle with Vite
npm run lint          # Run ESLint
npm run preview       # Preview the production build locally
npm run test          # Run Vitest in watch mode
npm run test:run      # Run all tests once
npm run test:coverage # Run tests and generate coverage report in coverage/
```

## Architecture

Single-page React 19 app built with Vite + TypeScript. The UI is split into three components, each in its own folder under `src/components/` with a colocated CSS file and test file.

```
src/
├── components/
│   ├── Hero/           # Hero section — badge, H1, CTAs, trust badges, image
│   ├── MobileDrawer/   # Full-screen mobile nav drawer
│   └── Navbar/         # Sticky header with logo, nav links, theme toggle
├── test/setup.ts       # Vitest + @testing-library/jest-dom bootstrap
├── App.tsx             # Root — holds isDark state, syncs data-theme on <html>
└── index.css           # CSS custom properties (design tokens) + global reset
```

### Theme System

Dark/light mode is toggled manually (not via `prefers-color-scheme`). `App.tsx` holds `isDark` state and sets `data-theme="light"|"dark"` on `document.documentElement`. All colour overrides are scoped to `[data-theme="dark"]` in `index.css`.

### Responsive Breakpoints

- **Desktop / Tablet** ≥768 px — horizontal navbar, two-column hero grid
- **Mobile** ≤767 px — hamburger nav, `MobileDrawer`, hero image stacks on top of text

### Assets

All static assets are in `public/` and referenced as absolute paths (`/logo-light.svg` etc.). There are no ES-module asset imports. Two tsconfig targets exist: `tsconfig.app.json` for the browser bundle and `tsconfig.node.json` for Vite config files.

## Testing

Tests use **Vitest** + **@testing-library/react** + **@testing-library/jest-dom** with a `jsdom` environment. Coverage is provided by `@vitest/coverage-v8`.

Coverage thresholds enforced in `vite.config.ts`:
- Statements: 80 %
- Functions: 80 %
- Branches: 70 %
- Lines: 80 %

When querying elements in tests, note that `MobileDrawer` renders with `aria-hidden="true"` when closed — use `document.querySelector('.drawer')` or `{ hidden: true }` for class/attribute assertions on the closed drawer.
