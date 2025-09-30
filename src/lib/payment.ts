'use server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import PaymentModel from '@/shared/models/payment'
import { paymentSchema } from '@/shared/schemas'
import {
  CreatePaymentFormValues,
  PaginatedResponse,
  Payment,
  RawPaymentSchema,
  UpdatePaymentFormValues
} from '@/shared/types'

export const getPatientPayments = async (
  patientId: string,
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<Payment[]>> => {
  const session = await auth()

  const safePage = Math.max(1, Math.floor(page))
  const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize)))
  const skip = (safePage - 1) * safePageSize

  if (session?.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()
    const [total, payments] = await Promise.all([
      PaymentModel.countDocuments({ patientId }),
      PaymentModel.find({ patientId })
        .sort({ createdAt: -1 })
        .populate<RawPaymentSchema>({
          path: 'appointment',
          select: 'startTime doctor',
          populate: {
            path: 'doctor',
            select: 'doctorName position'
          }
        })
        .transform((docs) =>
          docs.map((d) => ({
            ...d,
            _id: d._id.toString(),
            appointment: {
              _id: d.appointment?._id.toString(),
              startTime: d.appointment?.startTime,
              doctorName: d.appointment.doctor.doctorName,
              position: d.appointment?.doctor?.position
            },
            patientId: d.patientId.toString(),
            createdAt: d.createdAt?.toISOString(),
            updatedAt: d.updatedAt?.toISOString()
          }))
        )
        .skip(skip)
        .limit(safePageSize)
        .lean<Payment[]>({ getters: true })
    ])

    if (!payments) {
      return {
        data: [],
        total: 0,
        page: 0,
        pageSize: 0,
        totalPages: 0
      }
    }

    const totalPages = Math.max(1, Math.ceil(total / safePageSize))

    return {
      data: paymentSchema.array().parse(payments),
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages
    }
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

const getSinglePayment = async (paymentId: string): Promise<Payment> => {
  const session = await auth()

  try {
    await connectMongoDB()
    const payment = await PaymentModel.findById(paymentId)
      .populate<RawPaymentSchema>({
        path: 'appointment',
        select: 'startTime doctor',
        populate: {
          path: 'doctor',
          select: 'doctorName position'
        }
      })
      .transform((docs) => {
        return {
          ...docs,
          _id: docs?._id.toString(),
          appointment: {
            _id: docs?.appointment?._id.toString(),
            startTime: docs?.appointment?.startTime,
            doctorName: docs?.appointment.doctor.doctorName,
            position: docs?.appointment?.doctor?.position
          },
          patientId: docs?.patientId.toString(),
          createdAt: docs?.createdAt?.toISOString(),
          updatedAt: docs?.updatedAt?.toISOString()
        }
      })
      .lean<Payment>({ getters: true })

    if (!payment) {
      throw new Error('No payment found')
    }

    if (payment.patientId !== session?.user.id) {
      throw new Error('No access')
    }

    return paymentSchema.parse(payment)
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

export const createPayment = async (paymentData: CreatePaymentFormValues): Promise<Payment> => {
  const session = await auth()

  if (session?.user.id !== paymentData.patientId.toString()) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const newPaymentDoc = await PaymentModel.create({
      ...paymentData,
      appointment: paymentData.appointmentId,
      patientId: paymentData.patientId
    })

    if (!newPaymentDoc) {
      throw new Error('Creating payment failed')
    }

    const newPayment = await PaymentModel.findById(newPaymentDoc._id)
      .populate<RawPaymentSchema>({
        path: 'appointment',
        select: 'startTime doctor reason',
        populate: {
          path: 'doctor',
          select: 'doctorName position'
        }
      })
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          appointment: {
            _id: doc?.appointment._id.toString(),
            startTime: doc?.appointment?.startTime,
            doctorName: doc?.appointment.doctor.doctorName,
            position: doc?.appointment?.doctor?.position
          },
          patientId: doc?.patientId.toString(),
          createdAt: doc?.createdAt?.toISOString(),
          updatedAt: doc?.updatedAt?.toISOString()
        }
      })
      .lean<Payment>()

    if (!newPayment) {
      throw new Error('Creating payment failed')
    }

    return paymentSchema.parse(newPayment)
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

    const updPayment = await PaymentModel.findByIdAndUpdate(
      paymentData._id,
      {
        $set: {
          isPayed: paymentData.isPayed
        }
      },
      { new: true }
    )
      .populate<RawPaymentSchema>({
        path: 'appointment',
        select: 'startTime doctor reason',
        populate: {
          path: 'doctor',
          select: 'doctorName position'
        }
      })
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          appointment: {
            _id: doc?.appointment._id.toString(),
            startTime: doc?.appointment?.startTime,
            doctorName: doc?.appointment?.doctor?.doctorName,
            position: doc?.appointment?.doctor?.position
          },
          patientId: doc?.patientId.toString(),
          createdAt: doc?.createdAt instanceof Date ? doc?.createdAt?.toISOString() : doc?.createdAt,
          updatedAt: doc?.updatedAt instanceof Date ? doc?.updatedAt?.toISOString() : doc?.updatedAt
        }
      })
      .lean<Payment>()

    if (!updPayment) {
      throw new Error('Updating payment failed')
    }

    return paymentSchema.parse(updPayment)
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
