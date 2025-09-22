'use server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import DoctorModel from '@/shared/models/doctor'
import { Doctor } from '@/shared/types'

export const searchDoctors = async (position: string): Promise<Doctor[]> => {
  try {
    await connectMongoDB()

    const doctors = await DoctorModel.find({
      position: { $regex: position || '', $options: 'i' }
    }).lean<Doctor[]>()

    if (!doctors) {
      return []
    }

    return doctors
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Internal server error')
  }
}

export const getDoctor = async (id: string): Promise<Doctor> => {
  const session = await auth()

  if (session?.user.id !== id) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const doctor = await DoctorModel.findById(id).lean<Doctor>({ getters: true })

    if (!doctor) {
      throw new Error('No doctor found')
    }

    return doctor
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}
