import { describe, it, expect } from 'vitest'
import { formatPence, parsePounds, sumPence } from '../src/lib/money.js'

describe('money', () => {
  it('formats pence as pounds', () => {
    expect(formatPence(1250)).toBe('£12.50')
    expect(formatPence(5)).toBe('£0.05')
    expect(formatPence(123456)).toBe('£1,234.56')
  })

  it('parses pounds into pence', () => {
    expect(parsePounds('12.5')).toBe(1250)
    expect(parsePounds('£3.07')).toBe(307)
    expect(parsePounds('40')).toBe(4000)
    expect(() => parsePounds('12.345')).toThrow()
  })

  it('adds amounts without floating point errors', () => {
    expect(sumPence([10, 20])).toBe(30)
  })
})
