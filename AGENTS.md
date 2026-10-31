# Pettycash

Expense claims for a small company. The app and its API run together on Vite's dev server.

## Commands

- `npm run dev` starts the app and the API on http://localhost:5173
- `npm run check` runs lint, formatting and tests, the same as CI
- `npm run seed` resets the local data in `.data/`

## Rules

- Money is integer pence (`amountPence`). Use `formatPence()` and `parsePounds()` from `src/lib/money.js`. Never use decimals for money.
- Every route that takes a body validates it with a zod schema from `src/server/schemas.js`.
- Only `src/server/store.js` touches the data file. Handlers in `src/server/claims.js` take the store as their first argument.
- Every route gets tests in `test/api/`, using `tempStore()` from `test/api/helpers.js`.
- Expense limits live in `src/lib/policy.js`. Don't hard-code a limit anywhere else.
- Run `npm run check` before you say you're done.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`).

The reasons behind these, and more detail, are in CONTRIBUTING.md.
