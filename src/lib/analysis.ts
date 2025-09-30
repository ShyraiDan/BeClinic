'use server'

import { InferSchemaType } from 'mongoose'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import AnalysisModel from '@/shared/models/analysis'
import { analysesSchema } from '@/shared/schemas'
import { Analysis, AnalysisFormValues, PaginatedResponse } from '@/shared/types'

export const getAnalyses = async (
  patientId: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Analysis[]>> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  const safePage = Math.max(1, Math.floor(page))
  const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize)))
  const skip = (safePage - 1) * safePageSize

  try {
    await connectMongoDB()

    const [total, analyses] = await Promise.all([
      AnalysisModel.countDocuments({ patientId }),
      AnalysisModel.find({ patientId })
        .sort({ createdAt: -1 })

        .transform((docs) =>
          docs.map((d) => ({
            ...d,
            _id: d._id.toString(),
            patientId: d.patientId.toString(),
            createdAt: d.createdAt?.toISOString(),
            updatedAt: d.updatedAt?.toISOString()
          }))
        )
        .skip(skip)
        .limit(safePageSize)
        .lean<Analysis[]>({ getters: true })
    ])

    if (!analyses) {
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
      data: analysesSchema.array().parse(analyses),
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages
    }
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const getSingleAnalysis = async (patientId: string, analysisId: string): Promise<Analysis> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const analysis = await AnalysisModel.findById(analysisId)
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          patientId: doc?.patientId.toString(),
          createdAt: doc?.createdAt?.toISOString(),
          updatedAt: doc?.updatedAt?.toISOString()
        }
      })
      .lean<Analysis>()

    if (!analysis) {
      throw new Error('Error getting analysis')
    }

    return analysesSchema.parse(analysis)
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const createAnalysis = async (
  patientId: string,
  data: AnalysisFormValues
): Promise<InferSchemaType<Analysis>> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const newAnalysisDoc = await AnalysisModel.create({
      ...data,
      patientId
    })

    if (!newAnalysisDoc) {
      throw new Error('Creating analysis failed')
    }

    const newAnalysis = await AnalysisModel.findById(newAnalysisDoc._id)
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          patientId: doc?.patientId.toString(),
          createdAt: doc?.createdAt?.toISOString(),
          updatedAt: doc?.updatedAt?.toISOString()
        }
      })
      .lean<Analysis>()

    if (!newAnalysis) {
      throw new Error('Creating analysis failed')
    }

    return analysesSchema.parse(newAnalysis)
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const updateAnalysis = async (
  patientId: string,
  analysisId: string,
  data: AnalysisFormValues
): Promise<InferSchemaType<Analysis>> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const updAnalysis = await AnalysisModel.findOneAndUpdate(
      { _id: analysisId },
      {
        $set: {
          analysisName: data.analysisName,
          date: data.date,
          description: data.description,
          fileName: data.fileName
        }
      },
      { new: true }
    )
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          patientId: doc?.patientId.toString(),
          createdAt: doc?.createdAt instanceof Date ? doc?.createdAt?.toISOString() : doc?.createdAt,
          updatedAt: doc?.updatedAt instanceof Date ? doc?.updatedAt?.toISOString() : doc?.updatedAt
        }
      })
      .lean<Analysis>()

    if (!updAnalysis) {
      throw new Error('Update analysis failed')
    }

    return analysesSchema.parse(updAnalysis)
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const deleteAnalysis = async (analysisId: string): Promise<boolean> => {
  const session = await auth()

  if (!session) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const analysis = await getSingleAnalysis(session.user.id, analysisId)

    if (analysis.patientId !== session.user.id) {
      throw new Error('No access')
    }

    await AnalysisModel.findByIdAndDelete(analysisId)
    return true
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}
