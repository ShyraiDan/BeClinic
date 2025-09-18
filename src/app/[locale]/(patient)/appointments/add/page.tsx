import { useTranslations } from 'next-intl'

import { PatientAppointmentForm } from '@/components/forms/PatientAppointmentForm/PatientAppointmentForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'

const AddAppointmentPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('addAppointmentPage.title')} />
      <Container>
        <PatientAppointmentForm />
      </Container>
    </>
  )
}

export default AddAppointmentPage
