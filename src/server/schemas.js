import { z } from 'zod'
import { CATEGORIES } from '../lib/policy.js'

// Every route that accepts a body validates it with a schema from this file.

export const NewClaim = z.object({
  employee: z.string().min(1).max(80),
  category: z.enum(CATEGORIES),
  description: z.string().min(1).max(200),
  amountPence: z.number().int().positive(),
  spentOn: z.iso.date(),
  receipt: z.string().max(200).optional(),
})

export const Decision = z.object({
  approver: z.string().min(1).max(80),
  note: z.string().max(200).optional(),
})
