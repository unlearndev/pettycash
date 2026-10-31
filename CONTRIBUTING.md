# Contributing to Pettycash

## How we write code

- **Money is integer pence.** Every amount is a whole number of pence (`amountPence`). Never store, add or compare pounds as decimals. Format for display with `formatPence()` and parse input with `parsePounds()`, both in `src/lib/money.js`.
- **Every route validates its body.** Each route that accepts a body checks it with a zod schema from `src/server/schemas.js`, and returns 400 with the issues when it fails.
- **Routes go through the store.** Only `src/server/store.js` reads or writes the data file. Handlers live in `src/server/claims.js` and take the store as their first argument, so tests can pass in a temporary one.
- **Every route has tests.** In `test/api/`, using `tempStore()` from `test/api/helpers.js`. Cover the happy path and each error status the route can return.
- **The expenses policy lives in one place.** Limits and rules are in `src/lib/policy.js`. Don't hard-code a limit anywhere else.

## Before you open a pull request

- `npm run check` passes (lint, formatting and tests).
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`).
- The description says what changed, why, and how you checked it.

## Secrets

`.env` holds the keys for the payouts service. It's never committed, and nobody pastes its contents anywhere.
