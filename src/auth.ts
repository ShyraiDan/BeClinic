import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import connectMongoDB from '@/lib/mongodb'
import DoctorModel from '@/shared/models/doctor'
import PatientModel from '@/shared/models/patient'
import { UserRoles } from '@/shared/types'

import type { NextAuthConfig, Session } from 'next-auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
        role: {}
      },
      async authorize(credentials) {
        if (credentials === null) return null

        try {
          await connectMongoDB()

          if (credentials.role === 'patient') {
            const patient = await PatientModel.findOne({ email: credentials?.email as string })

            if (!patient) {
              return null
            }

            const isValidPass = await bcrypt.compare(credentials?.password as string, patient.passwordHash)

            if (!isValidPass) {
              return null
            }

            return {
              id: patient._id.toString(),
              name: patient.userName,
              email: patient.email,
              image: patient.avatarUrl,
              role: UserRoles.PATIENT
            }
          } else {
            const doctor = await DoctorModel.findOne({ email: credentials?.email as string })

            if (!doctor) {
              return null
            }

            const isValidPass = await bcrypt.compare(credentials?.password as string, doctor.passwordHash)

            if (!isValidPass) {
              return null
            }

            return {
              id: doctor._id.toString(),
              name: doctor.doctorName,
              email: doctor.email,
              image: doctor.image,
              role: UserRoles.DOCTOR
            }
          }
        } catch (error) {
          console.error('Auth error: ', error)

          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user && user.role === UserRoles.PATIENT) {
        const patient = await PatientModel.findOne({ email: token.email! })

        if (!patient) {
          return null
        }

        token.id = patient._id.toString()
        token.name = patient.userName
        token.email = patient.email
        token.image = patient.avatarUrl
        token.role = user.role
      }

      if (trigger === 'update') {
        if (token.role === UserRoles.PATIENT) {
          const patient = await PatientModel.findOne({ email: token.email! })

          if (!patient) {
            return null
          }

          token.id = patient._id.toString()
          token.name = patient.userName
          token.email = patient.email
          token.image = patient.avatarUrl
          token.role = 'patient'
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string | undefined,
          name: token.name,
          email: token.email,
          image: token.image,
          role: token.role
        } as Session['user'],
        accessToken: token.accessToken,
        expiresAt: token.expiresAt
      }
    }
  }
} satisfies NextAuthConfig)
