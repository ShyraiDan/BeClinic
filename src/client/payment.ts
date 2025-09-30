import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getPatientPayments, updatePayment } from '@/lib/payment'
import { Payment, UpdatePaymentFormValues } from '@/shared/types'

export const useGetPaymentsQuery = (patientId: string, page: number, pageSize: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['payments', { patientId, page, pageSize }],
    queryFn: patientId ? async () => await getPatientPayments(patientId, page, pageSize) : skipToken,
    enabled: !!patientId
  })

  return { data, isLoading, isFetching, isError }
}

interface UpdatePaymentParams {
  patientId: string
  paymentId: string
  data: UpdatePaymentFormValues
}

export const useUpdatePaymentMutation = (paymentId: string) => {
  const queryClient = useQueryClient()

  return useMutation<Payment, Error, UpdatePaymentParams>({
    mutationKey: ['payments', paymentId],
    mutationFn: async ({ data }: UpdatePaymentParams) => {
      return await updatePayment(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['payments', paymentId] })
    }
  })
}
