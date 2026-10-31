import { describe, it, expect } from 'vitest'
import { checkPolicy } from '../src/lib/policy.js'

describe('expenses policy', () => {
  it('accepts a claim within the limits', () => {
    expect(checkPolicy({ category: 'meals', amountPence: 1800, receipt: 'r.jpg' })).toEqual([])
  })

  it('flags a meal over the limit', () => {
    expect(checkPolicy({ category: 'meals', amountPence: 3000, receipt: 'r.jpg' })).toHaveLength(1)
  })

  it('needs a receipt over £10', () => {
    expect(checkPolicy({ category: 'travel', amountPence: 1001 })).toEqual([
      'a receipt is required over £10',
    ])
    expect(checkPolicy({ category: 'travel', amountPence: 1000 })).toEqual([])
  })
})
