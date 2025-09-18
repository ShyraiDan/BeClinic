'use server'

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
