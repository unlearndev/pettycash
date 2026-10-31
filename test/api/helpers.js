import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createStore } from '../../src/server/store.js'

// A store in a fresh temp folder, so tests never touch .data/
export function tempStore(claims = []) {
  const store = createStore(join(mkdtempSync(join(tmpdir(), 'pettycash-')), 'claims.json'))
  store.reset(claims)
  return store
}

export const claim = (fields = {}) => ({
  employee: 'Sam',
  category: 'travel',
  description: 'Train',
  amountPence: 2400,
  spentOn: '2026-10-28',
  receipt: 'receipts/train.pdf',
  ...fields,
})
