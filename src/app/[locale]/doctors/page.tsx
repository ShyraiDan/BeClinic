import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { Suspense } from 'react'

import DoctorCard from '@/components/DoctorCard/DoctorCard'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { DoctorCardSkeleton } from '@/components/skeletons/DoctorCardSkeletons'
import { Container } from '@/components/ui/container'
import { H2, P } from '@/components/ui/typography'
import { getDoctors } from '@/lib/doctors'

import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: 'seo' })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_PRODUCTION_URL!),
    applicationName: t('doctors.title'),
    title: t('doctors.title'),
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
      canonical: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/${locale}/doctors`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/en/doctors`,
        uk: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/uk/doctors`
      }
    },
    openGraph: {
      type: 'website',
      url: process.env.NEXT_PUBLIC_PRODUCTION_URL!,
      siteName: t('doctors.title'),
      title: t('doctors.title'),
      description: t('index.description'),
      images: [
        { url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/favicon.ico`, width: 1200, height: 630, alt: 'BeClinic' }
      ],
      locale: 'uk_UA',
      alternateLocale: ['en_US']
    }
  }
}

const mockedCertificates = [
  {
    image: '/certificate-img1.webp',
    alt: 'certificate-1'
  },
  {
    image: '/certificate-img2.webp',
    alt: 'certificate-2'
  },
  {
    image: '/certificate-img3.webp',
    alt: 'certificate-3'
  },
  {
    image: '/certificate-img4.webp',
    alt: 'certificate-4'
  },
  {
    image: '/certificate-img5.webp',
    alt: 'certificate-5'
  },
  {
    image: '/certificate-img6.webp',
    alt: 'certificate-6'
  }
]

interface CertificateProps {
  certificate: {
    alt: string
    image: string
  }
}

const Certificate = ({ certificate }: CertificateProps) => {
  return (
    <div key={certificate.alt} className='flex items-center justify-center'>
      <Image src={certificate.image} alt={certificate.alt} width={170} height={130} />
    </div>
  )
}

const DoctorsPage = async () => {
  const doctors = await getDoctors()
  const t = await getTranslations('page')

  return (
    <>
      <PageHeading title={t('doctors.title')} />
      <section className='md:grid md:grid-cols-2'>
        <div className="bg-[url('/department-single-img5.jpg')] bg-cover bg-no-repeat w-full h-[240px] bg-center md:h-[440px] md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2" />
        <div className='py-[60px] px-4 lg:max-w-[600px] lg:ml-auto'>
          <H2 className='mb-5 text-center text-[26px] md:text-left xl:text-[26px]'>{t('doctors.ourTeam')}</H2>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
          <P className='mt-4 font-light'>{t('doctors.description')}</P>
        </div>
      </section>

      <Container className='mt-[45px]'>
        <section className='py-4'>
          <H2 className='mb-5 text-center text-[26px] md:text-left xl:text-[26px]'>{t('doctors.doctors')}</H2>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
        </section>
        <section className='py-4 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[30px] lg:grid-cols-4'>
          <Suspense
            fallback={Array.from({ length: 4 }).map((_, index) => (
              <DoctorCardSkeleton key={index} />
            ))}>
            {doctors.length === 0 ? (
              <P>{t('doctors.noDoctors')}</P>
            ) : (
              <>
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
              </>
            )}
          </Suspense>

          {}
        </section>
        <section className='pt-[50px] mb-9'>
          <H2 className='mb-5 text-center text-[26px] md:text-left xl:text-[26px]'>
            {t('doctors.achievements.title')}
          </H2>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
          <P className='mt-4 font-light'>{t('doctors.achievements.description')}</P>
          <div className='grid grid-cols-2 mt-5 gap-5 md:grid-cols-3 lg:grid-cols-6'>
            {mockedCertificates.map((item) => (
              <Certificate certificate={item} key={item.alt} />
            ))}
          </div>
        </section>
      </Container>
    </>
  )
}

export default DoctorsPage
