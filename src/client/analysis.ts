import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getAnalyses, getSingleAnalysis, createAnalysis, updateAnalysis } from '@/lib/analysis'
import { AnalysisFormValues } from '@/shared/types'

export const useGetAnalysisQuery = (patientId: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['analysis', patientId],
    queryFn: patientId ? async () => await getAnalyses(patientId) : skipToken,
    enabled: !!patientId
  })

  return { data, isLoading, isFetching, isError }
}

export const useGetSingleAnalysisQuery = (patientId: string, analysisId: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['analysis', analysisId],
    queryFn: patientId && analysisId ? async () => await getSingleAnalysis(patientId, analysisId) : skipToken,
    enabled: !!patientId && !!analysisId
  })

  return { data, isLoading, isFetching, isError }
}

export const useCreateAnalysisMutation = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['analysis'],
    mutationFn: async ({ patientId, data }: { patientId: string; data: AnalysisFormValues }) => {
      return await createAnalysis(patientId, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['analysis', patientId] })
    }
  })
}

export const useUpdateAnalysisMutation = (patientId: string, analysisId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['analysis', analysisId],
    mutationFn: async ({
      patientId,
      analysisId,
      data
    }: {
      patientId: string
      analysisId: string
      data: AnalysisFormValues
    }) => {
      return await updateAnalysis(patientId, analysisId, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['analysis', patientId] })
    }
  })
}
