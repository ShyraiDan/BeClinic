import { useTranslations } from 'next-intl'

import { FaqItem } from '@/components/FaqItem/FaqItem'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'
import { H1, P } from '@/components/ui/typography'
import { mockedFaqs } from '@/mocks/Faqs.mock'

const FaqPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('faqs.title')} />
      <Container>
        <div className='max-w-[945px] mx-auto'>
          <H1 className='mb-5 text-center'>{t('faqs.subtitle')}</H1>
          <P className='text-center'>{t('faqs.description')}</P>
        </div>
        {mockedFaqs.map((item, i) => {
          return <FaqItem key={i} item={item} />
        })}
      </Container>
    </>
  )
}

export default FaqPage
