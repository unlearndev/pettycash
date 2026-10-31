// The company's expenses policy. Limits are in pence.

export const CATEGORIES = ['travel', 'meals', 'equipment', 'software', 'other']

export const LIMITS = {
  meals: 3000, // per claim
  equipment: 50000,
}

export const RECEIPT_REQUIRED_OVER = 1000

// Returns a list of problems with a claim. An empty list means it's within policy.
export function checkPolicy(claim) {
  const problems = []
  const limit = LIMITS[claim.category]
  if (limit !== undefined && claim.amountPence > limit) {
    problems.push(`${claim.category} claims are limited to ${limit} pence`)
  }
  if (claim.amountPence > RECEIPT_REQUIRED_OVER && !claim.receipt) {
    problems.push('a receipt is required over £10')
  }
  return problems
}
