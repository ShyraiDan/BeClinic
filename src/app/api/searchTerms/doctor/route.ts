'use server'

import { NextResponse } from 'next/server'

import connectMongoDB from '@/lib/mongodb'
import DoctorModel from '@/shared/models/doctor'
import { Doctor } from '@/shared/types'

export const GET = async (req: Request) => {
  const url = new URL(req.url)

  const position = url.searchParams.get('search')

  try {
    await connectMongoDB()

    const doctors = await DoctorModel.find({
      position: { $regex: position || '', $options: 'i' }
    }).lean<Doctor[]>()

    return NextResponse.json(doctors)
  } catch (error) {
    return NextResponse.json({ ok: false, error: { message: 'Internal server error' } }, { status: 500 })
  }
}
