import z from 'zod'

import { optionSchema } from './schemas'

export type Option = z.infer<typeof optionSchema>
