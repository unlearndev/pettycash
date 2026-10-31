import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

// The only module that touches the data file. Routes go through createStore(), never the file.

const DEFAULT_FILE = join(process.cwd(), '.data', 'claims.json')

export function createStore(file = DEFAULT_FILE) {
  function load() {
    if (!existsSync(file)) return { nextId: 1, claims: [] }
    return JSON.parse(readFileSync(file, 'utf8'))
  }

  function save(data) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
  }

  return {
    list() {
      return load().claims
    },
    get(id) {
      return load().claims.find((claim) => claim.id === id)
    },
    add(fields) {
      const data = load()
      const claim = { id: `PC-${1000 + data.nextId}`, status: 'submitted', ...fields }
      data.nextId += 1
      data.claims.push(claim)
      save(data)
      return claim
    },
    update(id, changes) {
      const data = load()
      const claim = data.claims.find((c) => c.id === id)
      if (!claim) return undefined
      Object.assign(claim, changes)
      save(data)
      return claim
    },
    reset(claims = []) {
      save({ nextId: claims.length + 1, claims })
    },
  }
}
