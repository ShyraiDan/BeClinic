'use server'

import nodemailer from 'nodemailer'

import { auth } from '@/auth'
import { appointmentCreationEmailEn, appointmentCreationEmailUa } from '@/components/email/appointmentCreationEmail'
import { paymentSuccessEmailEn, paymentSuccessEmailUa } from '@/components/email/paymentSuccessEmail'
import { PatientAppointment, Payment, SupportedLocales } from '@/shared/types'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  port: 587,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD_KEY
  }
})

interface SendEmailData {
  toEmail: string
  subject: string
  html: string
}

const getPaymentEmailData = (locale: SupportedLocales, patientName: string, payment: Payment) => {
  switch (locale) {
    case 'en':
      return {
        subject: 'Your payment has been processed',
        html: paymentSuccessEmailEn({
          patientName: patientName,
          appointmentDate: payment.appointment.startTime,
          appointmentTime: payment.appointment.startTime,
          doctorName: payment.appointment.doctorName,
          paymentAmount: payment.amount
        })
      }
    case 'uk':
      return {
        subject: 'Ваш платіж був оброблений',
        html: paymentSuccessEmailUa({
          patientName: patientName,
          appointmentDate: payment.appointment.startTime,
          appointmentTime: payment.appointment.startTime,
          doctorName: payment.appointment.doctorName,
          paymentAmount: payment.amount
        })
      }
  }
}

const getAppointmentCreationEmailData = (
  locale: SupportedLocales,
  patientName: string,
  appointment: PatientAppointment
) => {
  switch (locale) {
    case 'en':
      return {
        subject: 'Your appointment has been scheduled',
        html: appointmentCreationEmailEn({
          appointmentId: appointment._id,
          patientName: patientName,
          appointmentDate: appointment.startTime,
          appointmentTime: appointment.startTime,
          doctorName: appointment.doctorName
        })
      }
    case 'uk':
      return {
        subject: 'Ваша консультація була заброньована',
        html: appointmentCreationEmailUa({
          appointmentId: appointment._id,
          patientName: patientName,
          appointmentDate: appointment.startTime,
          appointmentTime: appointment.startTime,
          doctorName: appointment.doctorName
        })
      }
  }
}

export const sendAppointmentCreationEmail = async (locale: SupportedLocales, appointment: PatientAppointment) => {
  const session = await auth()

  const emailData = getAppointmentCreationEmailData(locale, session?.user.name || '', appointment)

  const paymentEmailData = {
    ...emailData,
    toEmail: session?.user.email || ''
  }

  await sendEmail(paymentEmailData)
}

export const sendPaymentSuccessEmail = async (locale: SupportedLocales, payment: Payment) => {
  const session = await auth()

  const emailData = getPaymentEmailData(locale, session?.user.name || '', payment)

  const paymentEmailData = {
    ...emailData,
    toEmail: session?.user.email || ''
  }

  await sendEmail(paymentEmailData)
}

export const sendEmail = async (data: SendEmailData) => {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: data.toEmail,
    subject: data.subject,
    html: data.html
  }

  await new Promise((resolve, reject) => {
    void transporter.sendMail(mailOptions, (err: Error | null, info) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(info)
        console.log('Email sent: ' + info.response)
      }
    })
  })
}
