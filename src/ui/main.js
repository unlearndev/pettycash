import { formatPence, sumPence } from '../lib/money.js'

const APPROVER = 'Alex'

async function load() {
  const res = await fetch('/api/claims')
  return res.json()
}

async function decide(id, action) {
  await fetch(`/api/claims/${id}/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ approver: APPROVER }),
  })
  render()
}

function row(claim) {
  const tr = document.createElement('tr')
  const flags = claim.problems?.length
    ? ` <span class="flag" title="${claim.problems.join(', ')}">!</span>`
    : ''
  tr.innerHTML = `
    <td>${claim.id}</td>
    <td>${claim.employee}</td>
    <td>${claim.description}<small>${claim.category} · ${claim.spentOn}</small></td>
    <td class="amount">${formatPence(claim.amountPence)}${flags}</td>
    <td><span class="status ${claim.status}">${claim.status}</span></td>
    <td class="actions"></td>`
  if (claim.status === 'submitted') {
    for (const action of ['approve', 'reject']) {
      const button = document.createElement('button')
      button.textContent = action
      button.className = action
      button.onclick = () => decide(claim.id, action)
      tr.querySelector('.actions').append(button)
    }
  }
  return tr
}

async function render() {
  const claims = await load()
  const waiting = claims.filter((claim) => claim.status === 'submitted')
  document.querySelector('#summary').textContent =
    `${waiting.length} waiting · ${formatPence(sumPence(waiting.map((c) => c.amountPence)))} to approve`
  document.querySelector('#claims tbody').replaceChildren(...claims.map(row))
}

render()
