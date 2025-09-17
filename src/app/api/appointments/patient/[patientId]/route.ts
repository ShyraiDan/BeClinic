'use server'

import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import AppointmentModel from '@/shared/models/appointment'
import { Doctor } from '@/shared/types'

interface GetPatientAppointmentsParams {
  patientId: string
}

interface GetPatientAppointmentsDbResponse {
  _id: string
  doctor: Doctor
  startTime: string
  endTime: string
  reason: string
  analyses: string
  description: string
  fileName: string
}

export const GET = async (req: Request, { params }: { params: Promise<GetPatientAppointmentsParams> }) => {
  const { patientId } = await params

  const session = await auth()

  if (!session || session.user.id !== patientId) {
    return NextResponse.json({ ok: false, error: { message: 'No access' } }, { status: 403 })
  }

  try {
    await connectMongoDB()
    const appointments = await AppointmentModel.find({ patient: patientId })
      .populate('doctor', 'doctorName position')
      .lean<GetPatientAppointmentsDbResponse[]>()

    if (!appointments) {
      return NextResponse.json({ ok: false, error: { message: 'Update failed' } }, { status: 404 })
    }

    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ ok: false, error: { message: 'Unexpected error' } }, { status: 500 })
  }
}
