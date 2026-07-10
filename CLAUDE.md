# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **Bun** (`bun.lock`), not npm. Run scripts with `bun run <script>`.

- `bun run dev` — Vite dev server with HMR (`--port 3000` to override port)
- `bun run build` — type-check (`tsc -b`) then production build to `dist/`
- `bun run lint` — ESLint; add `--fix` to auto-sort imports and apply fixes
- `bun run format` / `bun run format:check` — Prettier write / check
- `bun run preview` — serve built `dist/`

No test runner is configured.

## Architecture

Vite + React 19 + TypeScript SPA. `src/main.tsx` mounts `<App />` into `#root` under `StrictMode`, wrapped in `QueryClientProvider` → `ThemeProvider` → `BrowserRouter`. `src/App.tsx` declares the routes: a `Layout` route (Navbar + `<Outlet>`) wraps the pages in `src/pages` — Overview (`/`), Population, Economy. Pages are placeholder content so far.

### Styling — Tailwind v4 + shadcn/ui

- Tailwind v4 is wired through the **`@tailwindcss/vite`** plugin (`vite.config.ts`), not PostCSS. There is **no `tailwind.config.js`** — configuration is CSS-first in `src/main.css` via `@theme`.
- `src/main.css` holds the whole CSS config: fonts in `@theme`, shadcn's design tokens under `:root`/`.dark`, and base-element typography in `@layer base` (page `section`/`h1`/`p` styled with `text-foreground`). There is no custom color palette — use shadcn semantic tokens (`text-foreground`, `bg-muted`, `border-border`, …).
- shadcn/ui is set up with the **`base-nova`** style over **Base UI** primitives (`@base-ui/react`), not Radix. Config in `components.json`. Add components with `bunx shadcn@latest add <name>`; they land in `src/components/ui`. The `cn()` helper is `src/lib/utils.ts`.
- **Always prefer shadcn/ui components** over hand-rolled UI. Check for an existing component (or add one via `bunx shadcn@latest add`) before building custom primitives.
- Custom component files use **PascalCase** (`Navbar.tsx`, `Layout.tsx`, page files in `src/pages`); vendored shadcn files in `src/components/ui` keep their kebab-case names.
- When a Tailwind class string repeats across files, extract it — a custom **`@utility`** in `src/main.css` for a reusable class, or an element rule in **`@layer base`** for tag defaults (page `section`/`h1`/`p` are already styled there). Don't leave the same class list duplicated across components.

### Routing & theming

- **react-router v8** — single `react-router` package (DOM exports included). Routes live in `src/App.tsx`; page components in `src/pages`; `Layout` (`src/components/Layout.tsx`) renders `<Navbar>` + `<Outlet>`.
- **Light/dark theme** — `ThemeProvider` (`src/components/ThemeProvider.tsx`) toggles `.dark` on `<html>` and persists to `localStorage`. The `useTheme` hook + context live in `src/lib/theme.ts`, kept out of the component file so no file mixes a hook with a component export (react-refresh). `index.html` runs a pre-paint inline script to avoid a theme flash; `ModeToggle` flips light/dark.

### Data fetching

- HTTP goes through the shared **axios** instance in `src/lib/api.ts` (`baseURL` from `VITE_API_URL`; see `.env.example`).
- Server state is managed by **TanStack Query** — `QueryClientProvider` wraps the app in `src/main.tsx`. Fetch with `useQuery`/`useMutation` calling the `api` client; don't hand-roll `fetch` + `useEffect` data loading.
