import { z } from 'zod'

export const optionSchema = z.object({
  value: z.string(),
  label: z.string()
})
