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
- `src/App.jsx` — top-level component. Owns the `transactions` state (source of truth) and the
  `categories` list, and composes the app from three child components. Passes `transactions` down
  as props and an `onAddTransaction` callback to `TransactionForm`; components below do not lift
  state back up beyond that.
- `src/Summary.jsx` — takes `transactions` as a prop and derives `totalIncome`, `totalExpenses`,
  and `balance` itself (not passed in from `App`); renders the three summary cards.
- `src/TransactionForm.jsx` — owns its own form-input state (description/amount/type/category)
  locally via `useState`; on submit, builds the new transaction object and calls the
  `onAddTransaction` prop, then resets its own inputs. `App.jsx` has no knowledge of form-field
  state.
- `src/TransactionList.jsx` — takes `transactions` and `categories` as props and owns its own
  `filterType`/`filterCategory` state locally; filtering logic lives here, not in `App.jsx`.
- Transaction data is hardcoded initial state (`useState`) in `App.jsx` — there is no persistence
  (no localStorage, no API), so all data resets on page reload. Transaction `amount` is stored as
  a `number` (not a string) — keep it that way, since summing string amounts was a real bug that
  was fixed.
- Styling is plain CSS in `src/App.css` and `src/index.css` (no CSS framework or CSS-in-JS,
  and no per-component stylesheets — new components reuse existing class names).

The pattern established across these extractions: a component that both reads and derives from
`transactions`/`categories` computes its own derived values from raw props rather than receiving
pre-computed values, and a component that owns UI-local state (form inputs, filters) keeps that
state internal rather than lifting it into `App.jsx`. Follow this pattern for further extractions
(e.g. a single `TransactionRow`) rather than centralizing state back in `App.jsx`.
