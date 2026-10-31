# Pettycash

Expense claims for a small company: people submit claims, a manager approves or rejects them, and approved claims are paid out.

## Run it

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

The app and its API run together on Vite's dev server at http://localhost:5173.

## Checks

```bash
npm run lint
npm run format:check
npm test
npm run check   # all three, the same as CI
```

How we write code here is in CONTRIBUTING.md.
