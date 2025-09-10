import { useTranslations } from 'next-intl'

import { AppointmentForm } from '@/components/forms/AppointmentForm/AppointmentForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'

export const EditAppointmentPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('editAppointmentPage.title')} />
      <Container>
        <AppointmentForm />
      </Container>
    </>
  )
}
