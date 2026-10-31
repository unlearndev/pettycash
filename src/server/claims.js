import { NewClaim, Decision } from './schemas.js'
import { checkPolicy } from '../lib/policy.js'

// Route handlers. Each takes the store and the request's params and body,
// and returns { status, body }. api.js turns them into HTTP.

export function listClaims(store) {
  return { status: 200, body: store.list() }
}

export function submitClaim(store, body) {
  const parsed = NewClaim.safeParse(body)
  if (!parsed.success) return { status: 400, body: { error: parsed.error.issues } }
  const problems = checkPolicy(parsed.data)
  const claim = store.add({ ...parsed.data, problems })
  return { status: 201, body: claim }
}

function decide(store, id, body, status) {
  const parsed = Decision.safeParse(body)
  if (!parsed.success) return { status: 400, body: { error: parsed.error.issues } }
  const claim = store.get(id)
  if (!claim) return { status: 404, body: { error: 'No such claim' } }
  if (claim.status !== 'submitted') {
    return { status: 409, body: { error: `Claim is already ${claim.status}` } }
  }
  if (claim.employee === parsed.data.approver) {
    return { status: 403, body: { error: 'You cannot decide your own claim' } }
  }
  return { status: 200, body: store.update(id, { status, decidedBy: parsed.data.approver }) }
}

export function approveClaim(store, id, body) {
  return decide(store, id, body, 'approved')
}

export function rejectClaim(store, id, body) {
  return decide(store, id, body, 'rejected')
}
