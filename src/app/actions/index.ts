'use server'

import bcrypt from 'bcrypt'

import { signIn, signOut } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import DoctorModel from '@/shared/models/doctor'
import PatientModel from '@/shared/models/patient'
import { UserRoles } from '@/shared/types'
import { mapMongoError } from '@/utils/mongoErrors'

export const handleLogout = async () => {
  await signOut({ redirectTo: '/' })
}

export const handlePatientSignUp = async (
  formData: FormData
): Promise<{ ok: boolean; error?: { message: string } }> => {
  try {
    const values = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      userName: formData.get('userName') as string,
      role: formData.get('role') as UserRoles
    }

    if (!values.password) return { ok: false, error: { message: 'validation.passwordRequired' } }

    await connectMongoDB()

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(values.password.toString(), salt)

    await PatientModel.create({
      email: values.email,
      passwordHash: hash,
      userName: values.userName
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      redirect: false
    })

    console.log('handlePatientSignUp', response)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response
  } catch (error) {
    console.log('error', error)

    const { code } = mapMongoError(error)

    switch (code) {
      case 'DUPLICATE_KEY':
        return { ok: false, error: { message: 'validation.userExists' } }
    }

    return { ok: false, error: { message: 'validation.unexpectedError' } }
  }
}

export const handleDoctorSignUp = async (formData: FormData) => {
  try {
    const values = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      doctorName: formData.get('doctorName') as string,
      position: formData.get('position') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as UserRoles
    }

    if (!values.password) return { error: { message: 'Password is required' } }

    await connectMongoDB()

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(values.password.toString(), salt)

    await DoctorModel.create({
      email: values.email,
      passwordHash: hash,
      doctorName: values.doctorName,
      position: values.position,
      phone: values.phone
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      redirect: false
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response
  } catch (error) {
    const { code } = mapMongoError(error)

    switch (code) {
      case 'DUPLICATE_KEY':
        return { error: { message: 'validation.userExists' } }
    }

    throw error
  }
}
