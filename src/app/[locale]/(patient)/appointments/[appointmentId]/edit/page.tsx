'use client'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { useGetSinglePatientAppointmentQuery } from '@/client/appointment'
import { PatientAppointmentForm } from '@/components/forms/PatientAppointmentForm/PatientAppointmentForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'

const EditAppointmentPage = () => {
  const t = useTranslations('page')
  const { appointmentId } = useParams<{ appointmentId: string }>()
  const { data: session } = useSession()

  const { data: appointment, isLoading } = useGetSinglePatientAppointmentQuery(session?.user?.id || '', appointmentId)

  return (
    <>
      <PageHeading title={t('editAppointmentPage.title')} />
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <Container>
          <PatientAppointmentForm appointment={appointment} />
        </Container>
      )}
    </>
  )
}

export default EditAppointmentPage
