'use server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import PatientModel from '@/shared/models/patient'
import { Patient } from '@/shared/types'

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
    return { ok: false, error: { message: 'Unexpected error' } }
  }
}
