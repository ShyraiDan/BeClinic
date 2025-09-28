'use server'

import { isAfter } from 'date-fns'
import { InferSchemaType } from 'mongoose'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import AppointmentModel from '@/shared/models/appointment'
import { doctorAppointmentSchema, patientAppointmentSchema } from '@/shared/schemas'
import {
  Appointment,
  CreatePaymentFormValues,
  DoctorAppointment,
  DoctorEditAppointmentFormValues,
  PatientAppointment,
  PatientCreateAppointmentFormValuesDto,
  PatientEditAppointmentFormValuesDto
} from '@/shared/types'

import { createPayment } from './payment'

export const getPatientAppointments = async (patientId: string): Promise<PatientAppointment[]> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const appointments = await AppointmentModel.find({ patient: patientId })
      .populate('doctor', 'doctorName position')
      .populate('analyses', 'patientId analysisName description date fileName')
      .transform((docs) =>
        docs.map((d) => ({
          ...d,
          _id: d._id.toString(),
          analyses: d.analyses.map((analysis) => {
            return { ...analysis, _id: analysis._id.toString() }
          }),
          createdAt: d.createdAt?.toISOString(),
          updatedAt: d.updatedAt?.toISOString()
        }))
      )
      .lean<Appointment[]>()

    if (!appointments) {
      throw new Error('Error getting appointments')
    }

    return patientAppointmentSchema.array().parse(
      appointments.map((appointment) => ({
        ...appointment,
        doctorName: appointment.doctor.doctorName,
        doctorPosition: appointment.doctor.position
      }))
    )
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
      .populate('analyses', 'patientId analysisName description date fileName')
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          analyses: doc?.analyses.map((analysis) => {
            return { ...analysis, _id: analysis._id.toString() }
          }),
          createdAt: doc?.createdAt?.toISOString(),
          updatedAt: doc?.updatedAt?.toISOString()
        }
      })
      .lean<Appointment>()

    if (!appointment) {
      throw new Error('Error getting appointment')
    }

    if (appointment?.patient._id.toString() !== patientId) {
      throw new Error('No access')
    }

    return patientAppointmentSchema.parse({
      ...appointment,
      doctorName: appointment.doctor.doctorName,
      doctorPosition: appointment.doctor.position
    })
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

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

    const newAppointmentDoc = await AppointmentModel.create({
      ...data,
      doctor: data.doctorId,
      patient: patientId,
      analyses: data.analyses.map((analysis) => analysis._id)
    })

    if (!newAppointmentDoc) {
      throw new Error('Creating appointment failed')
    }

    const newAppointment = await AppointmentModel.findById(newAppointmentDoc._id)
      .populate('doctor', 'doctorName position')
      .populate('analyses', 'patientId analysisName description date fileName')
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          createdAt: doc?.createdAt?.toISOString(),
          updatedAt: doc?.updatedAt?.toISOString()
        }
      })
      .lean<Appointment>()

    if (!newAppointment) {
      throw new Error('Creating appointment failed')
    }

    if (isAfter(new Date(newAppointment.startTime), new Date())) {
      const payment: CreatePaymentFormValues = {
        appointmentId: newAppointment._id,
        amount: 1000,
        isPayed: false,
        patientId: newAppointment.patient._id
      }

      const newPayment = await createPayment(payment)

      if (!newPayment) {
        throw new Error('Creating payment failed')
      }
    }

    return patientAppointmentSchema.parse({
      ...newAppointment,
      doctorName: newAppointment.doctor.doctorName,
      doctorPosition: newAppointment.doctor.position
    })
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

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
        $set: { reason: data.reason, description: data.description, analyses: data.analyses, fileName: data.fileName }
      },
      { new: true }
    )
      .populate('doctor', 'doctorName position')
      .populate('analyses', 'patientId analysisName description date fileName')
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          createdAt: doc?.createdAt instanceof Date ? doc?.createdAt?.toISOString() : doc?.createdAt,
          updatedAt: doc?.updatedAt instanceof Date ? doc?.updatedAt?.toISOString() : doc?.updatedAt
        }
      })
      .lean<Appointment>()

    if (!appointment) {
      throw new Error('Update appointment failed')
    }

    return patientAppointmentSchema.parse({
      ...appointment,
      doctorName: appointment.doctor.doctorName,
      doctorPosition: appointment.doctor.position
    })
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
        'email userName dateOfBirth bloodType diabetes rhFactor bloodTransfusion intoleranceToMedicines infectiousDiseases surgicalInterventions allergies'
      )
      .transform((docs) =>
        docs.map((d) => ({
          ...d,
          _id: d._id.toString(),
          analyses: d.analyses.map((analysis) => {
            return { ...analysis, _id: analysis._id.toString() }
          }),
          patient: {
            ...d.patient,
            _id: d.patient._id.toString()
          },
          createdAt: d.createdAt?.toISOString(),
          updatedAt: d.updatedAt?.toISOString()
        }))
      )
      .lean<Appointment[]>()

    if (!appointments) {
      throw new Error('Update appointment failed')
    }

    return doctorAppointmentSchema.array().parse(appointments)
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
        'email userName dateOfBirth bloodType diabetes rhFactor bloodTransfusion intoleranceToMedicines infectiousDiseases surgicalInterventions allergies'
      )
      .transform((docs) => ({
        ...docs,
        _id: docs?._id.toString(),
        analyses: docs?.analyses.map((analysis) => {
          return { ...analysis, _id: analysis._id.toString() }
        }),
        patient: {
          ...docs?.patient,
          _id: docs?.patient._id.toString()
        },
        createdAt: docs?.createdAt?.toISOString(),
        updatedAt: docs?.updatedAt?.toISOString()
      }))
      .lean<Appointment>()

    if (!appointment) {
      throw new Error('Update appointment appointment')
    }

    if (appointment?.doctor._id.toString() !== doctorId) {
      throw new Error('No access')
    }

    return doctorAppointmentSchema.parse(appointment)
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
    )
      .transform((docs) => ({
        ...docs,
        _id: docs?._id.toString(),
        analyses: docs?.analyses.map((analysis) => {
          return { ...analysis, _id: analysis._id.toString() }
        }),
        patient: {
          ...docs?.patient,
          _id: docs?.patient._id.toString()
        },
        createdAt: docs?.createdAt instanceof Date ? docs?.createdAt?.toISOString() : docs?.createdAt,
        updatedAt: docs?.updatedAt instanceof Date ? docs?.updatedAt?.toISOString() : docs?.updatedAt
      }))
      .populate(
        'patient',
        'email userName dateOfBirth bloodType diabetes rhFactor bloodTransfusion intoleranceToMedicines infectiousDiseases surgicalInterventions allergies'
      )
      .lean<Appointment>()

    if (!appointment) {
      throw new Error('Update appointment failed')
    }

    return doctorAppointmentSchema.parse(appointment)
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const deleteAppointment = async (appointmentId: string) => {
  const session = await auth()

  if (!session) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const appointment = await AppointmentModel.findById(appointmentId)
      .populate('doctor', 'doctorName position')
      .populate('analyses', 'patientId analysisName description date fileName')
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          analyses: doc?.analyses.map((analysis) => {
            return { ...analysis, _id: analysis._id.toString() }
          }),
          createdAt: doc?.createdAt?.toISOString(),
          updatedAt: doc?.updatedAt?.toISOString()
        }
      })
      .lean<Appointment>()

    if (!appointment) {
      throw new Error('Error getting appointment')
    }

    if (appointment?.patient._id.toString() !== session.user.id) {
      throw new Error('No access')
    }

    await AppointmentModel.findByIdAndDelete(appointmentId)

    return true
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}
