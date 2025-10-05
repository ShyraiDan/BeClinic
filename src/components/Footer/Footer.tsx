import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Separator } from '@/components/ui/separator'
import { P, H4 } from '@/components/ui/typography'

const departmentsData = [
  {
    id: 'department-1',
    title: 'departments.nephrology',
    link: '/'
  },
  {
    id: 'department-2',
    title: 'departments.traumatology',
    link: '/'
  },
  {
    id: 'department-3',
    title: 'departments.gynecology',
    link: '/'
  },
  {
    id: 'department-4',
    title: 'departments.nephrology',
    link: '/'
  },
  {
    id: 'department-5',
    title: 'departments.cardiology',
    link: '/'
  },
  {
    id: 'department-6',
    title: 'departments.pulmanology',
    link: '/'
  }
]

const otherLinksData = [
  {
    id: 'footer-link-1',
    title: 'links.blog',
    link: '/blog?page=1'
  },
  {
    id: 'footer-link-2',
    title: 'links.faqs',
    link: '/faqs'
  },
  {
    id: 'footer-link-3',
    title: 'links.contacts',
    link: '/contacts'
  }
]

const SectionHeading = ({ title }: { title: string }) => {
  return (
    <>
      <H4 className='text-white'>{title}</H4>
      <div className='flex items-center justify-start mt-4 mb-6'>
        <div className='border border-solid border-[#c5cbcf] w-[65px]' />
      </div>
    </>
  )
}

export const Footer = () => {
  const t = useTranslations('footer')

  return (
    <footer className='bg-[#556476]'>
      <div className='xl:max-w-[1200px] xl:mx-auto'>
        <section className='pt-[30px] md:grid md:grid-cols-[31%_1fr_1fr_1fr]'>
          <div className='p-4'>
            <Link href='/' className='block mb-5'>
              <Image src='/logo.png' alt='BeClinic' width={182} height={32} />
            </Link>
            <P className='text-white font-light'>{t('description')}</P>
          </div>
          <div className='pt-[22px] px-4 pb-[30px] flex flex-col md:pt-4'>
            <SectionHeading title={t('departments.title')} />
            <ul>
              {departmentsData.map((item) => (
                <li className='pb-[3px]' key={item.id}>
                  <Link
                    href={item.link}
                    className='text-white font-primary transition-all duration-300 ease-in-out font-light leading-[1.9em] hover:text-blue-400'>
                    {t(item.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='pt-[22px] px-4 pb-[30px] flex flex-col md:pt-4'>
            <SectionHeading title={t('headOffice.title')} />
            <P className='mb-3 font-light text-white'>
              {t('headOffice.address')}
              <br />
              <Link
                href='mailto:info@beclinic.com'
                className='font-primary transition-all duration-300 ease-in-out hover:text-blue-400'>
                info@beclinic.com
              </Link>
              <br />
              <Link href='tel:80012345678' className='transition-all duration-300 ease-in-out hover:text-blue-400'>
                800 1234 56 78
              </Link>
            </P>
            <P className='font-light text-white'>
              {t('headOffice.businessDays')} 9:00 - 19:00
              <br /> {t('headOffice.saturday')} 10:00 - 18:00
              <br /> {t('headOffice.sunday')} {t('headOffice.weekday')}
            </P>
          </div>

          <div className='pt-[22px] px-4 pb-[30px] flex flex-col md:pt-4'>
            <SectionHeading title={t('links.title')} />
            <ul>
              {otherLinksData.map((item) => (
                <li className='pb-[3px]' key={item.id}>
                  <Link
                    href={item.link}
                    className='text-white font-primary transition-all duration-300 ease-in-out font-light leading-[1.9em] hover:text-blue-400'>
                    {t(item.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Separator className='bg-[#ffffff26] my-0' />
        <section className='pb-4 md:flex md:justify-between'>
          <div className='pt-2.5 px-4 md:pt-0 md:px-2.5'>
            <P className='mt-2.5 text-white font-light md:text-sm'>
              {t('bottom.terms')} | {t('bottom.policy')}
            </P>
          </div>
          <div className='pb-2.5 px-4 md:pt-0 md:px-2.5'>
            <P className='mt-2.5 text-white font-light md:text-sm'>ShyraiDan ©. {t('bottom.allRightsReserved')}.</P>
          </div>
        </section>
      </div>
    </footer>
  )
}
