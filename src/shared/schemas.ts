import { z } from 'zod'

import { SUPPORTED_LOCALES } from '@/shared/constants'

export type Locale = (typeof SUPPORTED_LOCALES)[number]

const localizedStringSchema = z
  .object(Object.fromEntries(SUPPORTED_LOCALES.map((l) => [l, z.string().min(1)])) as Record<Locale, z.ZodString>)
  .strict()

export const optionSchema = z.object({
  value: z.string(),
  label: z.string()
})

export const serviceSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string()
})

export const departmentSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string()
})

export const contactsItemSchema = z.object({
  icon: z.string(),
  type: z.string(),
  title: z.string(),
  info: z.string()
})

export const contactsAdvantageItemSchema = z.object({
  icon: z.string(),
  type: z.string(),
  title: z.string(),
  description: z.string()
})

export const contactsOfficeItemSchema = z.object({
  address: z.string(),
  email: z.string(),
  phone: z.string()
})

export const workingHoursItemSchema = z.object({
  businessDay: z.string(),
  saturday: z.string(),
  sunday: z.string()
})

export const blogSchema = z.object({
  _id: z.string(),
  // title: z.object({ en: z.string(), uk: z.string() }),
  // description: z.object({ en: z.string(), uk: z.string() }),
  title: localizedStringSchema,
  description: localizedStringSchema,
  image: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const blogFormValuesSchema = blogSchema.pick({
  title: true,
  description: true,
  image: true
})
