# Alarado — Simple Homepage

A responsive marketing homepage built with React 19, TypeScript and Vite. Features a light/dark theme toggle, mobile slide-in navigation, and 96% unit test coverage.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — dev server and bundler
- **Vitest** + **Testing Library** — unit tests and code coverage
- **Poppins** (Google Fonts) — typography
- **CSS custom properties** — design tokens, no CSS framework

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check then bundle for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests and generate coverage report |

## Project Structure

```
src/
├── components/
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   ├── Hero.css
│   │   └── Hero.test.tsx
│   ├── MobileDrawer/
│   │   ├── MobileDrawer.tsx
│   │   ├── MobileDrawer.css
│   │   └── MobileDrawer.test.tsx
│   └── Navbar/
│       ├── Navbar.tsx
│       ├── Navbar.css
│       └── Navbar.test.tsx
├── test/
│   └── setup.ts
├── App.tsx
├── App.test.tsx
├── index.css
└── main.tsx
public/
├── logo-light.svg / logo-dark.svg
├── hero-image-simple-homepage.png (+ @2x)
├── Moon_fill.svg / Moon_fill_light.svg / Sun_fill.svg
├── hamburger-button.svg / close-button.svg
├── Done_ring_round_fill.svg
└── favicon.ico
```

## Design Tokens

Defined as CSS custom properties in `src/index.css`:

| Token | Light | Dark |
|---|---|---|
| `--color-primary` | `#2A4DD0` | `#2A4DD0` |
| `--color-secondary` | `#4CA154` | `#4CA154` |
| `--color-heading` | `#111729` | `#F2F9FE` |
| `--color-text` | `#223344` | `#F2F9FE` |
| `--color-muted` | `#909193` | `#909193` |
| `--color-bg` | `#F2F9FE` | `#111729` |

## Features

- **Light / Dark mode** — toggled via a pill button in the navbar; persists via `data-theme` on `<html>`
- **Responsive layout** — two-column hero on desktop/tablet, stacked on mobile (≤767 px)
- **Mobile navigation** — full-screen slide-in drawer with Escape key and backdrop close, body scroll lock
- **Accessible** — semantic landmarks, `aria-current`, `aria-pressed`, `aria-hidden`, `aria-label` throughout
- **Retina images** — hero image served with `srcset` for 2× displays

## Test Coverage

```
All files  | 96.15% Stmts | 100% Branch | 92.85% Funcs | 100% Lines
```

59 tests across `App`, `Navbar`, `Hero` and `MobileDrawer`.
