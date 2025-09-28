'use server'

import nodemailer from 'nodemailer'

import { auth } from '@/auth'
import { appointmentCreationEmailEn, appointmentCreationEmailUa } from '@/components/email/appointmentCreationEmail'
import { PatientAppointment, SupportedLocales } from '@/shared/types'

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

export const sendEmail = async (locale: SupportedLocales, appointment?: PatientAppointment) => {
  const session = await auth()

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: session?.user.email || '',
    subject: locale === 'en' ? 'Your appointment has been scheduled' : 'Ваша консультація була заброньована',
    html: appointment
      ? locale === 'en'
        ? appointmentCreationEmailEn({
            appointmentId: appointment._id,
            patientName: session?.user.name || '',
            appointmentDate: appointment.startTime,
            appointmentTime: appointment.startTime,
            doctorName: appointment.doctorName
          })
        : appointmentCreationEmailUa({
            appointmentId: appointment._id,
            patientName: session?.user.name || '',
            appointmentDate: appointment.startTime,
            appointmentTime: appointment.startTime,
            doctorName: appointment.doctorName
          })
      : ''
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
