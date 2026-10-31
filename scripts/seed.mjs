import { readFileSync } from 'node:fs'
import { createStore } from '../src/server/store.js'

const claims = JSON.parse(readFileSync(new URL('../data/seed.json', import.meta.url), 'utf8'))
createStore().reset(claims)
console.log(`Seeded ${claims.length} claims into .data/claims.json`)
