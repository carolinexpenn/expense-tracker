# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is the starter project for a Claude Code course (codewithmosh.com). It is **intentionally**
a small, messy React app: it has a real bug, poor UI, and unrefined code structure, meant to be
fixed and improved incrementally during the course. Don't assume messiness or the bug is
accidental — but do fix things when asked.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build locally
npm run lint      # run ESLint over the project
```

There is no test suite / test runner configured in this repository.

Note: on this machine, `npm`/`node` may not be on PATH for a shell session that predates a fresh
Node.js install — if commands fail with "not recognized", add `C:\Program Files\nodejs` to PATH
for that session (e.g. in PowerShell: `$env:Path += ";C:\Program Files\nodejs"`).

## Architecture

This is a plain Vite + React 19 app with no router, no state management library, and no backend —
everything is client-side and in-memory.

- `src/main.jsx` — entry point, mounts `<App />` into `#root` inside `StrictMode`.
- `src/App.jsx` — the entire application. All state (transactions list and form inputs), derived
  calculations (income/expense/balance totals, filtering), and JSX markup live in this single
  component. There are no subcomponents, hooks, or utility modules yet.
- Transaction data is hardcoded initial state (`useState`) in `App.jsx` — there is no persistence
  (no localStorage, no API), so all data resets on page reload.
- Styling is plain CSS in `src/App.css` and `src/index.css` (no CSS framework or CSS-in-JS).

Because the whole app is one component, any feature work (e.g., editing/deleting transactions,
persistence, splitting out components) will likely mean expanding `App.jsx` or extracting pieces
out of it — there's no existing pattern to follow beyond what's already there.
