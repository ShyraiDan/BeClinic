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
  title: localizedStringSchema,
  description: localizedStringSchema,
  image: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const blogFormValuesSchema = blogSchema.pick({
  title: true,
  description: true,
  image: true
})

export const patientSchema = z.object({
  _id: z.string(),
  email: z.email(),
  userName: z.string(),
  dateOfBirth: z.string(),
  phoneNumber: z.string(),
  bloodType: z.string(),
  diabetes: z.string(),
  rhFactor: z.string(),
  bloodTransfusion: z.string(),
  intoleranceToMedicines: z.string(),
  infectiousDiseases: z.string(),
  surgicalInterventions: z.string(),
  allergies: z.string(),
  image: z.string().optional()
})

export const doctorSchema = z.object({
  _id: z.string(),
  email: z.email(),
  doctorName: z.string(),
  position: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
  phone: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const analysesSchema = z.object({
  _id: z.string(),
  patientId: z.string(),
  analysisName: z.string(),
  date: z.string(),
  description: z.string().optional(),
  fileName: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const appointmentSchema = z.object({
  _id: z.string(),
  patient: patientSchema,
  doctor: doctorSchema,
  reason: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  description: z.string().optional(),
  analyses: z.array(analysesSchema),
  fileName: z.string().optional()
})

export const paymentSchema = z.object({
  _id: z.string(),
  appointment: appointmentSchema,
  amount: z.number(),
  isPayed: z.boolean(),
  patient: patientSchema,
  createdAt: z.date(),
  updatedAt: z.date()
})

export const appointmentFormValuesSchema = appointmentSchema
  .pick({
    reason: true,
    startTime: true,
    endTime: true,
    description: true,
    analyses: true,
    fileName: true
  })
  .extend({
    doctorId: z.string(),
    specialty: z.string(),
    startTimeHours: z.string()
  })

export const selectOptionSchema = z.object({
  value: z.string(),
  label: z.string()
})

export const analysisFormValuesSchema = analysesSchema.pick({
  analysisName: true,
  date: true,
  description: true,
  fileName: true
})

export const reviewSchema = z.object({
  _id: z.string(),
  userName: z.string(),
  userPhoto: z.string(),
  userPosition: z.string(),
  review: z.string()
})
