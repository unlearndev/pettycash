// Money is always an integer number of pence. Never store or add pounds as floats.

export function formatPence(pence) {
  const sign = pence < 0 ? '-' : ''
  const abs = Math.abs(pence)
  const pounds = Math.floor(abs / 100)
  const rest = String(abs % 100).padStart(2, '0')
  return `${sign}£${pounds.toLocaleString('en-GB')}.${rest}`
}

// "12.5" or "12.50" or "£12.50" -> 1250. Throws on anything else.
export function parsePounds(text) {
  const match = /^£?(\d+)(?:\.(\d{1,2}))?$/.exec(String(text).trim())
  if (!match) throw new Error(`Not an amount: ${text}`)
  const pence = (match[2] ?? '').padEnd(2, '0')
  return Number(match[1]) * 100 + Number(pence)
}

export function sumPence(amounts) {
  return amounts.reduce((total, pence) => total + pence, 0)
}
