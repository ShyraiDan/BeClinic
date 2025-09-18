import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getPatientAppointments, getSinglePatientAppointment, createPatientAppointment } from '@/lib/appointment'
import { PatientCreateAppointmentFormValuesDto } from '@/shared/types'

export const usePatientAppointmentsQuery = (patientId: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['appointments', patientId],
    queryFn: patientId ? async () => await getPatientAppointments(patientId) : skipToken,
    enabled: !!patientId
  })

  return { data, isLoading, isFetching, isError }
}

export const useSinglePatientAppointmentQuery = (patientId: string, appointmentId: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn:
      patientId && appointmentId ? async () => await getSinglePatientAppointment(patientId, appointmentId) : skipToken,
    enabled: !!patientId && !!appointmentId
  })

  return { data, isLoading, isFetching, isError }
}

export const useCreateAppointmentMutation = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['appointment'],
    mutationFn: async ({ patientId, data }: { patientId: string; data: PatientCreateAppointmentFormValuesDto }) => {
      return await createPatientAppointment(patientId, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['appointments', patientId] })
    }
  })
}

export const useUpdateAppointmentMutation = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['appointment'],
    mutationFn: async ({ patientId, data }: { patientId: string; data: PatientCreateAppointmentFormValuesDto }) => {
      return await createPatientAppointment(patientId, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['appointments', patientId] })
    }
  })
}
