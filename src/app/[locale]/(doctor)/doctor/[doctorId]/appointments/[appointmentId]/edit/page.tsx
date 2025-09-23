import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { DoctorAppointmentForm } from '@/components/forms/DoctorAppointmentForm/DoctorAppointmentForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'
import { getSingleDoctorAppointment } from '@/lib/appointment'

interface EditAppointmentPageProps {
  doctorId: string
  appointmentId: string
}

const EditAppointmentPage = async ({ doctorId, appointmentId }: EditAppointmentPageProps) => {
  const appointment = await getSingleDoctorAppointment(doctorId, appointmentId)

  return (
    <>
      <Container>
        <DoctorAppointmentForm appointment={appointment} />
      </Container>
    </>
  )
}

interface WrapperEditAppointmentPageProps {
  params: Promise<{ doctorId: string; appointmentId: string }>
}

const WrapperEditAppointmentPage = async ({ params }: WrapperEditAppointmentPageProps) => {
  const { doctorId, appointmentId } = await params

  const t = await getTranslations('page')

  return (
    <>
      <PageHeading title={t('editAppointmentPage.title')} />
      <Suspense fallback={<LoadingContainer />}>
        <EditAppointmentPage doctorId={doctorId} appointmentId={appointmentId} />
      </Suspense>
    </>
  )
}

export default WrapperEditAppointmentPage
