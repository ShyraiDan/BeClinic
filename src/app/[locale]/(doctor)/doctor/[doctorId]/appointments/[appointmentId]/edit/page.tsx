'use client'

import { notFound, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { useGetSingleDoctorAppointmentQuery } from '@/client/appointment'
import { DoctorAppointmentForm } from '@/components/forms/DoctorAppointmentForm/DoctorAppointmentForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'

const EditDoctorAppointmentPage = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>()
  const { data: session } = useSession()
  const t = useTranslations('page')

  const { data: appointment, isLoading } = useGetSingleDoctorAppointmentQuery(session?.user?.id || '', appointmentId)

  if (!appointment && !isLoading) {
    notFound()
  }

  return (
    <>
      <PageHeading title={t('editAppointmentPage.title')} />
      {!isLoading && appointment ? (
        <Container>
          <DoctorAppointmentForm appointment={appointment} />
        </Container>
      ) : (
        <LoadingContainer />
      )}
    </>
  )
}

export default EditDoctorAppointmentPage
