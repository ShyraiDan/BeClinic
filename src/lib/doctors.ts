'use server'

import { revalidatePath } from 'next/cache'

import { auth, unstable_update } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import DoctorModel from '@/shared/models/doctor'
import { Doctor, EditDoctorFormValues } from '@/shared/types'

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

    return {
      ...doctor,
      _id: doctor._id.toString()
    }
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

export const updateDoctor = async (id: string, data: EditDoctorFormValues): Promise<Doctor> => {
  const session = await auth()

  if (session?.user.id !== id) {
    throw new Error('No access')
  }

  try {
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(
      { _id: id },
      {
        email: data.email,
        doctorName: data.doctorName,
        phone: data.phone,
        avatarUrl: data.avatarUrl ?? '',
        position: data.position,
        description: data.description
      },
      { new: true }
    ).lean<Doctor>()

    if (!updatedDoctor) throw new Error('Update failed')

    await unstable_update({ user: { image: updatedDoctor.avatarUrl } })

    revalidatePath('[locale]/doctor/[id]', 'page')

    return {
      ...updatedDoctor,
      _id: updatedDoctor._id.toString()
    }
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}
