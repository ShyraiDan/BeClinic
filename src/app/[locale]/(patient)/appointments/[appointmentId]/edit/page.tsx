import { useTranslations } from 'next-intl'

import { PatientAppointmentForm } from '@/components/forms/PatientAppointmentForm/PatientAppointmentForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'

const EditAppointmentPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('editAppointmentPage.title')} />
      <Container>
        <PatientAppointmentForm />
      </Container>
    </>
  )
}

export default EditAppointmentPage
