'use server'

import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import AppointmentModel from '@/shared/models/appointment'
import {
  Appointment,
  PatientCreateAppointmentFormValuesDtoSchema,
  PatientEditAppointmentFormValuesDtoSchema
} from '@/shared/types'

export const updateAppointmentByPatientId = async (
  patientId: string,
  data: PatientEditAppointmentFormValuesDtoSchema
) => {
  const session = await auth()

  if (session?.user.id !== patientId) {
    return NextResponse.json({ ok: false, error: { message: 'No access' } }, { status: 403 })
  }

  try {
    await connectMongoDB()

    const appointment = await AppointmentModel.findOneAndUpdate(
      { _id: data._id },
      {
        ...data
      }
    ).lean()

    revalidatePath('[locale]/appointments/[id]', 'page')

    return NextResponse.json(
      { ok: true, data: JSON.parse(JSON.stringify(appointment)) as Appointment },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json({ ok: false, error: { message: 'Unexpected error' } }, { status: 500 })
  }
}

export const createAppointmentByPatientId = async (
  patientId: string,
  data: PatientCreateAppointmentFormValuesDtoSchema
) => {
  const session = await auth()

  if (session?.user.id !== patientId) {
    return NextResponse.json({ ok: false, error: { message: 'No access' } }, { status: 403 })
  }

  try {
    await connectMongoDB()

    const appointment = await AppointmentModel.create({
      ...data
    })

    revalidatePath('[locale]/appointments/[id]', 'page')

    return NextResponse.json(
      { ok: true, data: JSON.parse(JSON.stringify(appointment)) as Appointment },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json({ ok: false, error: { message: 'Unexpected error' } }, { status: 500 })
  }
}
