import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

import { Map } from '@/components/Map/Map'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { StyledLink } from '@/components/ui/styledLink'
import { H1, P, H5 } from '@/components/ui/typography'
import { Link } from '@/i18n/navigation'
import {
  mockedContactsItems,
  mockedAdvantageItems,
  mockedOfficeItems,
  mockedWorkingHours
} from '@/mocks/ContactsPage.mock'
import { cn } from '@/utils/utils'

import type { ContactsItem, ContactsOfficeItem, ContactsAdvantageItem, WorkingHoursItem } from '@/shared/types'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: 'seo' })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_PRODUCTION_URL!),
    applicationName: t('contacts.title'),
    title: t('contacts.title'),
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
      canonical: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/${locale}/contacts`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/en/contacts`,
        uk: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/uk/contacts`
      }
    },
    openGraph: {
      type: 'website',
      url: process.env.NEXT_PUBLIC_PRODUCTION_URL!,
      siteName: t('contacts.title'),
      title: t('contacts.title'),
      description: t('index.description'),
      images: [
        { url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/favicon.ico`, width: 1200, height: 630, alt: 'BeClinic' }
      ],
      locale: 'uk_UA',
      alternateLocale: ['en_US']
    }
  }
}

const ContactsItem = ({ item }: { item: ContactsItem }) => {
  const t = useTranslations('page')

  return (
    <div className='flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start md:gap-[18px]'>
      <Image src={item.icon} alt={item.title} className='md:h-8 md:w-8' width={32} height={32} />
      <div className='flex flex-col items-center justify-center md:items-start md:justify-start'>
        <H5 className='mt-3 text-blue-100 text-lg md:mt-0'>{t(item.title)}</H5>

        {item.type === 'address' ? (
          <P className='text-[26px] text-black-100'>{item.info}</P>
        ) : (
          <Link
            className='transition-all duration-300 ease-in-out text-[26px] font-primary text-black-100 hover:text-blue-100 md:h-[31px]'
            href={item.type === 'phone' ? `tel:${item.info}` : `mailto:${item.info}`}>
            {item.info}
          </Link>
        )}
      </div>
    </div>
  )
}

const AdvantagesItem = ({ item }: { item: ContactsAdvantageItem }) => {
  const t = useTranslations('page')

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8 px-4',
        item.type === 'doctor' ? 'bg-blue-500' : item.type === 'treatment' ? 'bg-blue-600' : 'bg-[#2a88c9]'
      )}>
      <Image src={item.icon} alt={item.title} width={50} height={50} />
      <H5 className='mt-4 mb-1.5 text-white text-center text-lg'>{t(item.title)}</H5>
      <P className='text-sm font-thin text-white text-center'>{t(item.description)}</P>
    </div>
  )
}

const OfficeItem = ({ item, count }: { item: ContactsOfficeItem; count: number }) => {
  const t = useTranslations('page')

  return (
    <div className='p-2.5 mb-5'>
      <H5 className='mb-2.5 text-center text-blue-100 text-[26px] md:text-left'>
        {t('contacts.location.branch', { count: count + 1 })}
      </H5>
      <P className='mt-3 text-center font-light md:text-left'>
        {t(item.address)} <br />
        <StyledLink href={`mailto:${item.email}`} className='justify-center md:justify-start'>
          {item.email}
        </StyledLink>
        <StyledLink href={`tel:${item.phone}`} className='justify-center md:justify-start'>
          {item.phone}
        </StyledLink>
      </P>
    </div>
  )
}

const WorkingHoursItem = ({ item }: { item: WorkingHoursItem }) => {
  const t = useTranslations('page')

  return (
    <div className='p-2.5 mb-5'>
      <H5 className='mb-2.5 text-center text-blue-100 text-[26px] lg:text-left'>
        {t('contacts.location.workingHours')}
      </H5>
      <P className='mt-3 text-center font-light lg:text-left'>
        {t('contacts.location.businessDays')} {item.businessDay}
      </P>
      <P className='text-center font-light lg:text-left'>
        {t('contacts.location.saturday')} {item.saturday}
      </P>
      <P className='text-center font-light lg:text-left'>
        {t('contacts.location.sunday')} {t(item.sunday)}
      </P>
    </div>
  )
}

const ContactsPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('contacts.title')} />
      <div className='md:grid md:grid-cols-2'>
        <div className="bg-[url('/contacts-img1.jpg')] bg-cover bg-no-repeat w-full h-[240px] bg-center md:h-[580px] md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2" />
        <div className='py-[60px] px-4 lg:max-w-[600px] lg:ml-auto'>
          <H1 className='mb-5 text-center text-[26px] md:text-left xl:text-[26px]'>{t('contacts.subtitle')}</H1>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
          <P className='mt-5 text-center mb-[30px] md:text-left'>{t('contacts.description')}</P>
          <div className='flex flex-col gap-8'>
            {mockedContactsItems.map((item, i) => (
              <ContactsItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row'>
        {mockedAdvantageItems.map((item, i) => (
          <AdvantagesItem key={i} item={item} />
        ))}
      </div>
      <div className='lg:grid lg:grid-cols-2'>
        <Map />
        <div className='pt-[54px] md:py-8 md:pl-[50px] md:grid md:grid-cols-2 xl:w-[600px] xl:mr-auto'>
          <div className='flex flex-col'>
            {mockedOfficeItems.map((item, i) => (
              <OfficeItem key={i} item={item} count={i} />
            ))}
          </div>
          <div className='flex flex-col'>
            {mockedWorkingHours.map((item, i) => (
              <WorkingHoursItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactsPage
