'use server'

import { InferSchemaType } from 'mongoose'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import AnalysisModel from '@/shared/models/analysis'
import { Analysis, AnalysisFormValues } from '@/shared/types'

export const getAnalyses = async (patientId: string): Promise<Analysis[]> => {
  const session = await auth()

  if (!session || session.user.id !== patientId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const analyses = await AnalysisModel.find({ patientId }).lean<Analysis[]>()

    if (!analyses) {
      return []
    }

    return analyses.map((analysis) => ({
      ...analysis,
      _id: analysis._id.toString(),
      patientId: analysis.patientId.toString()
    }))
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

    const analysis = await AnalysisModel.findById(analysisId).lean<Analysis>()

    if (!analysis) {
      throw new Error('Error getting analysis')
    }

    return {
      ...analysis,
      _id: analysis._id.toString(),
      patientId: analysis.patientId.toString()
    }
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

    const newAnalysis = await AnalysisModel.findById(newAnalysisDoc._id).lean()

    if (!newAnalysis) {
      throw new Error('Creating analysis failed')
    }

    return {
      ...newAnalysis,
      _id: newAnalysis._id.toString(),
      patientId: newAnalysis.patientId.toString()
    }
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
        ...data
      }
    ).lean()

    if (!updAnalysis) {
      throw new Error('Update analysis failed')
    }

    return {
      ...updAnalysis,
      _id: updAnalysis._id.toString(),
      patientId: updAnalysis.patientId.toString()
    }
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
