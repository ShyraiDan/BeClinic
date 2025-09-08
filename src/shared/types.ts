import z from 'zod'

import { SUPPORTED_LOCALES } from './constants'
import {
  departmentSchema,
  optionSchema,
  serviceSchema,
  contactsItemSchema,
  contactsAdvantageItemSchema,
  contactsOfficeItemSchema,
  workingHoursItemSchema,
  blogSchema,
  blogFormValuesSchema
} from './schemas'

export type SupportedLocales = (typeof SUPPORTED_LOCALES)[number]

export type Option = z.infer<typeof optionSchema>
export type Service = z.infer<typeof serviceSchema>
export type Department = z.infer<typeof departmentSchema>
export type ContactsItem = z.infer<typeof contactsItemSchema>
export type ContactsOfficeItem = z.infer<typeof contactsOfficeItemSchema>
export type ContactsAdvantageItem = z.infer<typeof contactsAdvantageItemSchema>
export type WorkingHoursItem = z.infer<typeof workingHoursItemSchema>
export type Blog = z.infer<typeof blogSchema>
export type BlogFormValues = z.infer<typeof blogFormValuesSchema>
