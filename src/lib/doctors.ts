'use server'

import { revalidatePath } from 'next/cache'

import { auth, unstable_update } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import DoctorModel from '@/shared/models/doctor'
import { doctorSchema } from '@/shared/schemas'
import { Doctor, EditDoctorFormValues } from '@/shared/types'

export const searchDoctors = async (position: string): Promise<Doctor[]> => {
  try {
    await connectMongoDB()

    const doctors = await DoctorModel.find({
      position: { $regex: position || '', $options: 'i' }
    })
      .transform((docs) =>
        docs.map((d) => ({
          ...d,
          _id: d._id.toString(),
          createdAt: d.createdAt?.toISOString(),
          updatedAt: d.updatedAt?.toISOString()
        }))
      )
      .lean<Doctor[]>()

    if (!doctors) {
      return []
    }

    return doctorSchema.array().parse(doctors)
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Internal server error')
  }
}

export const getDoctors = async (): Promise<Doctor[]> => {
  try {
    await connectMongoDB()
    const doctors = await DoctorModel.find()
      .transform((docs) =>
        docs.map((d) => ({
          ...d,
          _id: d._id.toString(),
          createdAt: d.createdAt?.toISOString(),
          updatedAt: d.updatedAt?.toISOString()
        }))
      )
      .lean<Doctor[]>()

    if (!doctors) {
      return []
    }

    return doctorSchema.array().parse(doctors)
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

export const getSingleDoctor = async (id: string): Promise<Doctor> => {
  try {
    await connectMongoDB()
    const doctor = await DoctorModel.findById(id)
      .transform((docs) => {
        return {
          ...docs,
          _id: docs?._id.toString(),
          createdAt: docs?.createdAt?.toISOString(),
          updatedAt: docs?.updatedAt?.toISOString()
        }
      })
      .lean<Doctor>({ getters: true })

    if (!doctor) {
      throw new Error('No doctor found')
    }

    return doctorSchema.parse(doctor)
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
        $set: {
          email: data.email,
          doctorName: data.doctorName,
          phone: data.phone,
          avatarUrl: data.avatarUrl,
          position: data.position,
          description: data.description
        }
      },

      { new: true }
    )
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          createdAt: doc?.createdAt instanceof Date ? doc?.createdAt?.toISOString() : doc?.createdAt,
          updatedAt: doc?.updatedAt instanceof Date ? doc?.updatedAt?.toISOString() : doc?.updatedAt
        }
      })
      .lean<Doctor>()

    if (!updatedDoctor) throw new Error('Update doctor failed')

    await unstable_update({ user: { image: updatedDoctor.avatarUrl } })

    revalidatePath('[locale]/doctor/[id]', 'page')

    return doctorSchema.parse(updatedDoctor)
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}
