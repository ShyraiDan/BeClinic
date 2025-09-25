'use server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import PaymentModel from '@/shared/models/payment'
import { CreatePaymentFormValues, Payment, UpdatePaymentFormValues } from '@/shared/types'

export const getPatientPayments = async (patientId: string): Promise<Payment[]> => {
  const session = await auth()

  if (session?.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const payments = await PaymentModel.find({ patient: patientId })
      .populate({
        path: 'appointment',
        select: 'startTime doctor',
        populate: {
          path: 'doctor',
          select: 'doctorName position'
        }
      })
      .lean<Payment[]>({ getters: true })

    if (!payments) {
      return []
    }

    return payments.map((payment) => ({
      ...payment,
      _id: payment._id.toString(),
      patientId: payment.patientId.toString()
    }))
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

const getSinglePayment = async (paymentId: string): Promise<Payment> => {
  const session = await auth()

  try {
    await connectMongoDB()
    const payment = await PaymentModel.findById(paymentId).lean<Payment>()

    console.log('payment', payment)

    if (!payment) {
      throw new Error('No payment found')
    }

    if (payment.patientId !== session?.user.id) {
      throw new Error('No access')
    }

    return {
      ...payment,
      _id: payment._id.toString(),
      patientId: payment.patientId.toString()
    }
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

export const createPayment = async (paymentData: CreatePaymentFormValues): Promise<Payment> => {
  const session = await auth()

  if (session?.user.id !== paymentData.patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const newPaymentDoc = await PaymentModel.create({
      ...paymentData
    })

    if (!newPaymentDoc) {
      throw new Error('Creating payment failed')
    }

    const newPayment = await PaymentModel.findById(newPaymentDoc._id).lean<Payment>()

    if (!newPayment) {
      throw new Error('Creating payment failed')
    }

    return {
      ...newPayment,
      _id: newPayment._id.toString(),
      patientId: newPayment.patientId.toString()
    }
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

export const updatePayment = async (paymentData: UpdatePaymentFormValues): Promise<Payment> => {
  const session = await auth()

  if (session?.user.id !== paymentData.patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const updPaymentDoc = await PaymentModel.findByIdAndUpdate(paymentData._id, {
      ...paymentData
    })

    if (!updPaymentDoc) {
      throw new Error('Updating payment failed')
    }

    const updPayment = await PaymentModel.findById(updPaymentDoc._id).lean<Payment>()

    if (!updPayment) {
      throw new Error('Updating payment failed')
    }

    return {
      ...updPayment,
      _id: updPayment._id.toString(),
      patientId: updPayment.patientId.toString()
    }
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

export const deletePayment = async (paymentId: string): Promise<boolean> => {
  const session = await auth()

  try {
    await connectMongoDB()

    const payment = await getSinglePayment(paymentId)

    if (payment.patientId !== session?.user.id) {
      throw new Error('No access')
    }

    await PaymentModel.findByIdAndDelete(paymentId)

    return true
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}
