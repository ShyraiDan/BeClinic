import { useTranslations } from 'next-intl'

import { AnalysisForm } from '@/components/forms/AnalysisForm/AnalysisForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'

const EditAnalysisPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('editAnalysisPage.title')} />
      <Container>
        <AnalysisForm />
      </Container>
    </>
  )
}

export default EditAnalysisPage
