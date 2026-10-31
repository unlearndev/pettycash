import { createStore } from './store.js'
import { listClaims, submitClaim, approveClaim, rejectClaim } from './claims.js'

// Mounts the API on Vite's dev server, so `npm run dev` runs the app and the API together.

const routes = [
  ['GET', /^\/api\/claims$/, (store) => listClaims(store)],
  ['POST', /^\/api\/claims$/, (store, _m, body) => submitClaim(store, body)],
  [
    'POST',
    /^\/api\/claims\/([\w-]+)\/approve$/,
    (store, m, body) => approveClaim(store, m[1], body),
  ],
  ['POST', /^\/api\/claims\/([\w-]+)\/reject$/, (store, m, body) => rejectClaim(store, m[1], body)],
]

async function readBody(req) {
  let raw = ''
  for await (const chunk of req) raw += chunk
  return raw ? JSON.parse(raw) : {}
}

export function apiPlugin() {
  return {
    name: 'pettycash-api',
    configureServer(server) {
      const store = createStore()
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        const route = routes.find(
          ([method, pattern]) => method === req.method && pattern.test(url.pathname),
        )
        if (!route) return next()
        try {
          const body = req.method === 'POST' ? await readBody(req) : undefined
          const result = route[2](store, url.pathname.match(route[1]), body)
          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: error.message }))
        }
      })
    },
  }
}
