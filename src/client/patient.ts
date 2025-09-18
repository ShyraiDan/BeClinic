import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getPatient, updatePatient } from '@/lib/patient'
import { EditPatientFormValues } from '@/shared/types'

export const usePatientQuery = (patientId: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['patient', patientId],
    queryFn: patientId ? async () => await getPatient(patientId) : skipToken,
    enabled: !!patientId
  })

  return { data, isLoading, isFetching, isError }
}

export const useUpdatePatientMutation = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['patient'],
    mutationFn: async ({ patientId, data }: { patientId: string; data: EditPatientFormValues }) => {
      return await updatePatient(patientId, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['patient', patientId] })
    }
  })
}
