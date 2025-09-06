import z from 'zod'

import { departmentSchema, optionSchema, serviceSchema } from './schemas'

export type Option = z.infer<typeof optionSchema>
export type Service = z.infer<typeof serviceSchema>
export type Department = z.infer<typeof departmentSchema>
