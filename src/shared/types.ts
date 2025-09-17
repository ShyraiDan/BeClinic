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
  blogFormValuesSchema,
  patientSchema,
  appointmentSchema,
  analysesSchema,
  doctorSchema,
  paymentSchema,
  appointmentFormValuesSchema,
  selectOptionSchema,
  analysisFormValuesSchema,
  reviewSchema,
  patientSignInFormValuesSchema,
  patientSignUpFormValuesSchema,
  doctorSignInFormValuesSchema,
  doctorSignUpFormValuesSchema,
  editPatientFormValuesSchema,
  editDoctorFormValuesSchema,
  dbErrorSchema,
  patientAppointmentSchema
} from './schemas'

import type { DefaultSession } from 'next-auth'

export enum UserRoles {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  GUEST = 'guest'
}

declare module 'next-auth' {
  interface User {
    id: string
    role: UserRoles
  }

  interface Session {
    user: DefaultSession['user'] & {
      id: string
      role: UserRoles
    }
  }
}

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
export type Patient = z.infer<typeof patientSchema>
export type Appointment = z.infer<typeof appointmentSchema>
export type Analysis = z.infer<typeof analysesSchema>
export type Doctor = z.infer<typeof doctorSchema>
export type Payment = z.infer<typeof paymentSchema>
export type AppointmentFormValues = z.infer<typeof appointmentFormValuesSchema>
export type SelectOption = z.infer<typeof selectOptionSchema>
export type AnalysisFormValues = z.infer<typeof analysisFormValuesSchema>
export type Review = z.infer<typeof reviewSchema>
export type PatientSignInFormValues = z.infer<typeof patientSignInFormValuesSchema>
export type PatientSignUpFormValues = z.infer<typeof patientSignUpFormValuesSchema>
export type DoctorSignInFormValues = z.infer<typeof doctorSignInFormValuesSchema>
export type DoctorSignUpFormValues = z.infer<typeof doctorSignUpFormValuesSchema>
export type EditPatientFormValues = z.infer<typeof editPatientFormValuesSchema>
export type EditDoctorFormValues = z.infer<typeof editDoctorFormValuesSchema>
export type DbError = z.infer<typeof dbErrorSchema>
export type PatientAppointment = z.infer<typeof patientAppointmentSchema>
