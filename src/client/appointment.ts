import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getPatientAppointments,
  getSinglePatientAppointment,
  createPatientAppointment,
  updatePatientAppointment,
  getDoctorAppointments,
  getSingleDoctorAppointment,
  updateDoctorAppointment,
  deleteAppointment
} from '@/lib/appointment'
import { doctorAppointmentSchema, patientAppointmentSchema } from '@/shared/schemas'
import {
  DoctorAppointment,
  DoctorEditAppointmentFormValues,
  PatientAppointment,
  PatientCreateAppointmentFormValuesDto,
  PatientEditAppointmentFormValuesDto
} from '@/shared/types'

export const useGetPatientAppointmentsQuery = (patientId: string, page: number, pageSize: number) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['appointments', patientId, page, pageSize],
    queryFn: patientId ? async () => await getPatientAppointments(patientId, page, pageSize) : skipToken,
    enabled: !!patientId
  })

  return { data, isLoading, isFetching, isError }
}

export const useGetSinglePatientAppointmentQuery = (patientId: string, appointmentId: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn:
      patientId && appointmentId ? async () => await getSinglePatientAppointment(patientId, appointmentId) : skipToken,
    enabled: !!patientId && !!appointmentId
  })

  return { data, isLoading, isFetching, isError }
}

export const useGetSingleDoctorAppointmentQuery = (patientId: string, appointmentId: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn:
      patientId && appointmentId ? async () => await getSingleDoctorAppointment(patientId, appointmentId) : skipToken,
    enabled: !!patientId && !!appointmentId
  })

  return { data, isLoading, isFetching, isError }
}

interface CreateAppointmentParams {
  patientId: string
  data: PatientCreateAppointmentFormValuesDto
}

export const useCreateAppointmentMutation = (patientId: string) => {
  const queryClient = useQueryClient()

  return useMutation<PatientAppointment, Error, CreateAppointmentParams>({
    mutationKey: ['appointment'],
    mutationFn: async ({ patientId, data }: CreateAppointmentParams) => {
      const result = await createPatientAppointment(patientId, data)

      return patientAppointmentSchema.parse(result)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['appointments', patientId] })
    }
  })
}

interface UpdateAppointmentParams {
  patientId: string
  appointmentId: string
  data: PatientEditAppointmentFormValuesDto
}

export const useUpdatePatientAppointmentMutation = (patientId: string, appointmentId: string) => {
  const queryClient = useQueryClient()

  return useMutation<PatientAppointment, Error, UpdateAppointmentParams>({
    mutationKey: ['appointment', appointmentId],
    mutationFn: async ({ patientId, appointmentId, data }: UpdateAppointmentParams) => {
      const result = await updatePatientAppointment(patientId, appointmentId, data)

      return patientAppointmentSchema.parse(result)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['appointments', patientId] })
    }
  })
}

export const useGetDoctorAppointmentsQuery = (doctorId: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['appointments', doctorId],
    queryFn: doctorId ? async () => await getDoctorAppointments(doctorId) : skipToken,
    enabled: !!doctorId
  })

  return { data, isLoading, isFetching, isError }
}

interface UpdateDoctorAppointmentParams {
  doctorId: string
  appointmentId: string
  data: DoctorEditAppointmentFormValues
}

export const useUpdateDoctorAppointmentMutation = (doctorId: string, appointmentId: string) => {
  const queryClient = useQueryClient()

  return useMutation<DoctorAppointment, Error, UpdateDoctorAppointmentParams>({
    mutationKey: ['appointment', appointmentId],
    mutationFn: async ({ doctorId, appointmentId, data }: UpdateDoctorAppointmentParams) => {
      const result = await updateDoctorAppointment(doctorId, appointmentId, data)

      return doctorAppointmentSchema.parse(result)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['appointments', doctorId] })
    }
  })
}

export const useDeleteAppointmentMutation = (appointmentId: string) => {
  return useMutation({
    mutationKey: ['analysis', appointmentId],
    mutationFn: async ({ appointmentId }: { appointmentId: string }) => {
      return await deleteAppointment(appointmentId)
    }
  })
}
