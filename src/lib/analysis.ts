'use server'

import { InferSchemaType } from 'mongoose'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import AnalysisModel from '@/shared/models/analysis'
import { analysesSchema } from '@/shared/schemas'
import { Analysis, AnalysisFormValues } from '@/shared/types'

export const getAnalyses = async (patientId: string): Promise<Analysis[]> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const analyses = await AnalysisModel.find({ patientId })
      .transform((docs) =>
        docs.map((d) => ({
          ...d,
          _id: d._id.toString(),
          patientId: d.patientId.toString(),
          createdAt: d.createdAt?.toISOString(),
          updatedAt: d.updatedAt?.toISOString()
        }))
      )
      .lean<Analysis[]>()

    if (!analyses) {
      return []
    }

    return analysesSchema.array().parse(analyses)
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
