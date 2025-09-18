'use server'

import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import AppointmentModel from '@/shared/models/appointment'
import {
  Appointment,
  PatientAppointment,
  DefaultResponse,
  PatientCreateAppointmentFormValuesDto,
  PatientEditAppointmentFormValuesDto
} from '@/shared/types'

export const getPatientAppointments = async (
  patientId: string
): Promise<NextResponse<DefaultResponse<PatientAppointment[]>>> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    return NextResponse.json({ ok: false, error: { message: 'No access' } }, { status: 403 })
  }

  try {
    await connectMongoDB()
    const appointments = await AppointmentModel.find({ patient: patientId })
      .populate('doctor', 'doctorName position')
      .lean<Appointment[]>()

    if (!appointments) {
      return NextResponse.json({ ok: false, error: { message: 'Update failed' } }, { status: 404 })
    }

    const appointmentDto = appointments.map((appointment) => ({
      _id: appointment._id,
      doctorName: appointment.doctor.doctorName,
      doctorPosition: appointment.doctor.position,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      description: appointment.description,
      analyses: appointment.analyses,
      fileName: appointment.fileName,
      reason: appointment.reason
    }))

    return NextResponse.json({ ok: true, data: appointmentDto }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ ok: false, error: { message: 'Unexpected error' } }, { status: 500 })
  }
}

export const getSinglePatientAppointment = async (
  patientId: string,
  appointmentId: string
): Promise<NextResponse<DefaultResponse<PatientAppointment>>> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    return NextResponse.json({ ok: false, error: { message: 'No access' } }, { status: 403 })
  }

  try {
    await connectMongoDB()
    const appointment = await AppointmentModel.findById(appointmentId)
      .populate('doctor', 'doctorName position')
      .lean<Appointment>()

    if (!appointment) {
      return NextResponse.json({ ok: false, error: { message: 'Update failed' } }, { status: 404 })
    }

    if (appointment?.patient._id.toString() !== patientId) {
      return NextResponse.json({ ok: false, error: { message: 'No access' } }, { status: 403 })
    }

    return NextResponse.json(
      {
        ok: true,
        data: {
          _id: appointment._id,
          doctorName: appointment.doctor.doctorName,
          doctorPosition: appointment.doctor.position,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          description: appointment.description,
          analyses: appointment.analyses,
          fileName: appointment.fileName,
          reason: appointment.reason
        }
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ ok: false, error: { message: 'Unexpected error' } }, { status: 500 })
  }
}

// TODO: Test this endpoint
export const createPatientAppointment = async (
  patientId: string,
  data: PatientCreateAppointmentFormValuesDto
): Promise<NextResponse<DefaultResponse<PatientAppointment>>> => {
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
      { ok: true, data: JSON.parse(JSON.stringify(appointment)) as PatientAppointment },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json({ ok: false, error: { message: 'Unexpected error' } }, { status: 500 })
  }
}

// TODO: Test this endpoint
export const updatePatientAppointment = async (
  patientId: string,
  data: PatientEditAppointmentFormValuesDto
): Promise<NextResponse<DefaultResponse<PatientAppointment>>> => {
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
      { ok: true, data: JSON.parse(JSON.stringify(appointment)) as PatientAppointment },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json({ ok: false, error: { message: 'Unexpected error' } }, { status: 500 })
  }
}
