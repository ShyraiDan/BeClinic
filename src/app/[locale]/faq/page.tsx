import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

import { FaqItem } from '@/components/FaqItem/FaqItem'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'
import { H1, P } from '@/components/ui/typography'
import { mockedFaqs } from '@/mocks/Faqs.mock'

import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: 'seo' })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_PRODUCTION_URL!),
    applicationName: t('faq.title'),
    title: t('faq.title'),
    description: t('index.description'),

    keywords: ['медицина', 'онлайн запис', 'лікарі', 'онлайн медкарта', 'clinic', 'appointments', 'аналіз', 'analysis'],
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/${locale}/faq`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/en/faq`,
        uk: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/uk/faq`
      }
    },
    openGraph: {
      type: 'website',
      url: process.env.NEXT_PUBLIC_PRODUCTION_URL!,
      siteName: t('faq.title'),
      title: t('faq.title'),
      description: t('index.description'),
      images: [
        { url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/favicon.ico`, width: 1200, height: 630, alt: 'BeClinic' }
      ],
      locale: 'uk_UA',
      alternateLocale: ['en_US']
    }
  }
}

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
