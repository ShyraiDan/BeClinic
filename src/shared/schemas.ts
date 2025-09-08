import { z } from 'zod'

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
  title: z.string(),
  description: z.string(),
  image: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})
