'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import PatientModel from '@/shared/models/patient'
import { EditPatientFormValues, Patient } from '@/shared/types'

export const getPatient = async (id: string): Promise<Patient> => {
  const session = await auth()

  if (session?.user.id !== id) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const patient = await PatientModel.findById(id).lean<Patient>({ getters: true })

    if (!patient) {
      throw new Error('No patient found')
    }

    return patient
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

export const updatePatient = async (id: string, data: EditPatientFormValues): Promise<Patient> => {
  const session = await auth()

  if (session?.user.id !== id) {
    throw new Error('No access')
  }

  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      { _id: id },
      {
        email: data.email,
        userName: data.userName,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        bloodType: data.bloodType,
        diabetes: data.diabetes,
        rhFactor: data.rhFactor,
        bloodTransfusion: data.bloodTransfusion,
        intoleranceToMedicines: data.intoleranceToMedicines,
        infectiousDiseases: data.infectiousDiseases,
        surgicalInterventions: data.surgicalInterventions,
        allergies: data.allergies,
        avatarUrl: data.avatarUrl ?? ''
      },
      { new: true }
    ).lean<Patient>()

    if (!updatedPatient) throw new Error('Update failed')

    revalidatePath('[locale]/patient/[id]', 'page')

    return {
      ...updatedPatient,
      _id: updatedPatient._id.toString()
    }
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}
