'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import PatientModel from '@/shared/models/patient'
import { EditPatientFormValues, Patient } from '@/shared/types'

export const getPatient = async (id: string): Promise<{ ok: boolean; data?: Patient; error?: { message: string } }> => {
  const session = await auth()

  if (session?.user.id !== id) {
    return { ok: false, error: { message: 'No access' } }
  }

  try {
    await connectMongoDB()
    const patient = await PatientModel.findById(id)

    return { ok: true, data: JSON.parse(JSON.stringify(patient)) as Patient }
  } catch (error) {
    console.error(error)

    return { ok: false, error: { message: 'Unexpected error' } }
  }
}

export const updatePatient = async (
  id: string,
  data: EditPatientFormValues
): Promise<{ ok: boolean; data?: Patient; error?: { message: string } }> => {
  const session = await auth()

  if (session?.user.id !== id) {
    return { ok: false, error: { message: 'No access' } }
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
        image: data.image ?? ''
      },
      { new: true }
    )

    if (!updatedPatient) return { ok: false, error: { message: 'Update failed' } }

    revalidatePath('[locale]/mycabinet/patient/[id]', 'page')

    return { ok: true, data: JSON.parse(JSON.stringify(updatedPatient)) as Patient }
  } catch (error) {
    console.error(error)

    return { ok: false, error: { message: 'Unexpected error' } }
  }
}
