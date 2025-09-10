import { useTranslations } from 'next-intl'

import { AppointmentForm } from '@/components/forms/AppointmentForm/AppointmentForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'

const AddAppointmentPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('addAppointmentPage.title')} />
      <Container>
        <AppointmentForm />
      </Container>
    </>
  )
}

export default AddAppointmentPage
