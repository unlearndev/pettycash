import { describe, it, expect } from 'vitest'
import { submitClaim, approveClaim, rejectClaim, listClaims } from '../../src/server/claims.js'
import { tempStore, claim } from './helpers.js'

describe('claims API', () => {
  it('submits a valid claim', () => {
    const store = tempStore()
    const result = submitClaim(store, claim())
    expect(result.status).toBe(201)
    expect(result.body).toMatchObject({ id: 'PC-1001', status: 'submitted', problems: [] })
    expect(listClaims(store).body).toHaveLength(1)
  })

  it('rejects a body that fails the schema', () => {
    const result = submitClaim(tempStore(), claim({ amountPence: 24.5 }))
    expect(result.status).toBe(400)
  })

  it('records policy problems on the claim', () => {
    const result = submitClaim(tempStore(), claim({ category: 'meals', amountPence: 3500 }))
    expect(result.body.problems).toEqual(['meals claims are limited to 3000 pence'])
  })

  it('approves a submitted claim', () => {
    const store = tempStore()
    const { id } = submitClaim(store, claim()).body
    const result = approveClaim(store, id, { approver: 'Alex' })
    expect(result.body).toMatchObject({ status: 'approved', decidedBy: 'Alex' })
  })

  it("won't let you approve your own claim", () => {
    const store = tempStore()
    const { id } = submitClaim(store, claim({ employee: 'Alex' })).body
    expect(approveClaim(store, id, { approver: 'Alex' }).status).toBe(403)
  })

  it("won't decide a claim twice", () => {
    const store = tempStore()
    const { id } = submitClaim(store, claim()).body
    rejectClaim(store, id, { approver: 'Alex' })
    expect(approveClaim(store, id, { approver: 'Alex' }).status).toBe(409)
  })

  it('returns 404 for a claim that does not exist', () => {
    expect(approveClaim(tempStore(), 'PC-9999', { approver: 'Alex' }).status).toBe(404)
  })
})
