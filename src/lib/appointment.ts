'use server'

import { InferSchemaType } from 'mongoose'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import AppointmentModel from '@/shared/models/appointment'
import {
  Appointment,
  DoctorAppointment,
  DoctorEditAppointmentFormValues,
  PatientAppointment,
  PatientCreateAppointmentFormValuesDto,
  PatientEditAppointmentFormValuesDto
} from '@/shared/types'

// TODO: Review error messages

export const getPatientAppointments = async (patientId: string): Promise<PatientAppointment[]> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const appointments = await AppointmentModel.find({ patient: patientId })
      .populate('doctor', 'doctorName position')
      .lean<Appointment[]>()

    if (!appointments) {
      throw new Error('Update failed')
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
      reason: appointment.reason,
      medicine: appointment.medicine,
      treatment: appointment.treatment
    }))

    return appointmentDto
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const getSinglePatientAppointment = async (
  patientId: string,
  appointmentId: string
): Promise<PatientAppointment> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const appointment = await AppointmentModel.findById(appointmentId)
      .populate('doctor', 'doctorName position')
      .lean<Appointment>()

    if (!appointment) {
      throw new Error('Update failed')
    }

    if (appointment?.patient._id.toString() !== patientId) {
      throw new Error('No access')
    }

    return {
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
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

// TODO: Test this endpoint
export const createPatientAppointment = async (
  patientId: string,
  data: PatientCreateAppointmentFormValuesDto
): Promise<InferSchemaType<PatientAppointment>> => {
  const session = await auth()

  if (session?.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const appointment = await AppointmentModel.create({
      ...data
    })

    if (!appointment) {
      throw new Error('Update failed')
    }

    return appointment
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

// TODO: Test this endpoint
export const updatePatientAppointment = async (
  patientId: string,
  appointmentId: string,
  data: PatientEditAppointmentFormValuesDto
): Promise<InferSchemaType<PatientAppointment>> => {
  const session = await auth()

  if (session?.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const appointment = await AppointmentModel.findOneAndUpdate(
      { _id: appointmentId },
      {
        ...data
      }
    ).lean()

    if (!appointment) {
      throw new Error('Update failed')
    }

    return appointment
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const getDoctorAppointments = async (doctorId: string): Promise<DoctorAppointment[]> => {
  const session = await auth()

  if (!session || session.user.id !== doctorId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const appointments = await AppointmentModel.find({ doctor: doctorId })
      .populate(
        'patient',
        'userName dateOfBirth bloodType diabetes rhFactor bloodTransfusion intoleranceToMedicines infectiousDiseases surgicalInterventions allergies'
      )
      .lean<Appointment[]>()

    if (!appointments) {
      throw new Error('Update failed')
    }

    const appointmentDto = appointments.map((appointment) => ({
      _id: appointment._id.toString(),
      diagnosis: appointment.diagnosis,
      treatment: appointment.treatment,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      medicine: appointment.medicine,
      analyses: appointment.analyses,
      fileName: appointment.fileName,
      patient: appointment.patient,
      reason: appointment.reason,
      description: appointment.description
    }))

    return appointmentDto
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const getSingleDoctorAppointment = async (
  doctorId: string,
  appointmentId: string
): Promise<DoctorAppointment> => {
  const session = await auth()

  if (!session || session.user.id !== doctorId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const appointment = await AppointmentModel.findById(appointmentId)
      .populate(
        'patient',
        'userName dateOfBirth bloodType diabetes rhFactor bloodTransfusion intoleranceToMedicines infectiousDiseases surgicalInterventions allergies'
      )
      .lean<Appointment>()

    if (!appointment) {
      throw new Error('Update failed')
    }

    if (appointment?.doctor._id.toString() !== doctorId) {
      throw new Error('No access')
    }

    return {
      _id: appointment._id.toString(),
      diagnosis: appointment.diagnosis,
      treatment: appointment.treatment,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      medicine: appointment.medicine,
      analyses: appointment.analyses,
      fileName: appointment.fileName,
      patient: appointment.patient,
      reason: appointment.reason,
      description: appointment.description
    }
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const updateDoctorAppointment = async (
  doctorId: string,
  appointmentId: string,
  data: DoctorEditAppointmentFormValues
): Promise<InferSchemaType<DoctorAppointment>> => {
  const session = await auth()

  if (session?.user.id !== doctorId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const appointment = await AppointmentModel.findOneAndUpdate(
      { _id: appointmentId },
      { $set: { diagnosis: data.diagnosis, treatment: data.treatment, medicine: data.medicine } }
    ).lean<Appointment>()

    if (!appointment) {
      throw new Error('Update failed')
    }

    return appointment
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}
