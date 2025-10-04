import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import { HeroSlider } from '@/components/HeroSlider/HeroSlider'
import { DoctorCardSkeleton } from '@/components/skeletons/DoctorCardSkeletons'
import { Container } from '@/components/ui/container'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H3, H4, P } from '@/components/ui/typography'
import {
  mockedDepartments,
  mockedDepartmentsTwo,
  mockedDepartmentsOne,
  mockedServicesData,
  mockedClients
} from '@/mocks/HeroPage.mock'
import { Service, Department, UserRoles } from '@/shared/types'

const ServiceItem = ({ item }: { item: Service }) => {
  const t = useTranslations('page')

  return (
    <div className='py-4'>
      <Image src={item.icon} alt={item.title} width={50} height={50} />
      <div>
        <H4 className='my-4 font-normal text-xl'>{t(item.title)}</H4>
        <P className='text-black-200 font-light text-sm'>{t(item.description)}</P>
      </div>
    </div>
  )
}

const DepartmentsItem = ({ item }: { item: Department }) => {
  const t = useTranslations('page')

  return (
    <div className='mx-4 px-2.5 mt-4 pt-[27px] pb-[30px] flex flex-col items-center justify-center'>
      <Image src={item.icon} alt={item.title} className='mb-4' width={90} height={90} />
      <H4 className='mt-4 mb-2.5 text-xl text-center'>{t(item.title)}</H4>
      <P className='text-black-200 font-light text-center'>{t(item.description)}</P>
    </div>
  )
}

const Departments = () => {
  return (
    <>
      <div className='lg:hidden md:grid md:grid-cols-3'>
        {mockedDepartments.map((item, i) => (
          <DepartmentsItem key={`departments-${i}`} item={item} />
        ))}
      </div>

      <div className='hidden lg:grid lg:grid-cols-4'>
        {mockedDepartmentsOne.map((item, i) => (
          <DepartmentsItem key={`departments-lg-first-${i}`} item={item} />
        ))}
      </div>
      <div className='hidden lg:grid lg:grid-cols-5'>
        {mockedDepartmentsTwo.map((item, i) => (
          <DepartmentsItem key={`departments-lg-second-${i}`} item={item} />
        ))}
      </div>
    </>
  )
}

const HeroPage = async () => {
  const t = await getTranslations('page')
  const session = await auth()
  return (
    <>
      <div>
        <HeroSlider />
      </div>
      <Container className='my-0 pb-0'>
        <div className='mt-[-55px] mb-[34px] bg-white md:grid md:grid-cols-3 z-[10] relative'>
          <div className='py-5 px-4 border-b-[7px] border-solid border-blue-500'>
            <H3 className='mb-5 text-blue-100 font-normal text-[26px]'>{t('hero.schedule')}</H3>
            <div className='mb-5 py-3 border-b border-solid border-grey-200'>
              <P className='flex items-center justify-between'>
                <span className='text-sm font-bold text-black-200'>{t('hero.businessDays')}</span>
                <span className='text-blue-100 text-sm font-bold'>9:00 - 18:00</span>
              </P>
            </div>
            <div className='mb-5 py-3 border-b border-solid border-grey-200'>
              <P className='flex items-center justify-between'>
                <span className='text-sm font-bold text-black-200'>{t('hero.saturday')}</span>
                <span className='text-blue-100 text-sm font-bold'>10:00-18:00</span>
              </P>
            </div>
            <div className='mb-5 py-3 border-b border-solid border-grey-200'>
              <P className='flex items-center justify-between'>
                <span className='text-sm font-bold text-black-200'>{t('hero.sunday')}</span>
                <span className='text-blue-100 text-sm font-bold'>{t('hero.weekday')}</span>
              </P>
            </div>
          </div>

          <div className='py-5 px-4 border-b-[7px] border-solid border-blue-600'>
            <H3 className='mb-5 text-blue-100 font-normal text-[26px]'>{t('hero.doctors.schedule')}</H3>
            <P className='mb-5 text-black-200 font-light'>{t('hero.doctors.description')}</P>
            {session?.user.role === UserRoles.PATIENT && (
              <StyledLinkButton variant='outline-blue' href='/appointments/add'>
                {t('hero.button.makeAnAppointment')}
              </StyledLinkButton>
            )}
          </div>

          <div className='py-5 px-4 border-b-[7px] border-solid border-blue-100'>
            <H3 className='mb-5 text-blue-100 font-normal text-[26px]'> {t('hero.urgentCases.title')}</H3>
            <div className='flex items-center mb-5'>
              <Image
                src='/contacts-icon-1.webp'
                alt='telephone'
                width={30}
                height={30}
                className='w-[30px] h-[30px] mr-2'
              />
              <Link
                className='text-[26px] uppercase transition-all duration-300 ease-in-out hover:text-blue-100'
                href='tel:8001234567'>
                800 123 45 67
              </Link>
            </div>
            <P className='text-black-200 font-light'>{t('hero.urgentCases.description')}</P>
          </div>
        </div>

        <div className='py-4'>
          <H3 className='mb-5 text-[26px]'>{t('hero.services.title')}</H3>
          <div className='flex items-center justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
        </div>

        <div className='pb-[50px] md:grid md:grid-cols-4 md:gap-[30px]'>
          {mockedServicesData.map((item, i) => (
            <ServiceItem key={i} item={item} />
          ))}
        </div>
      </Container>
      <div className="py-[70px] mb-[50px] bg-[url('/fullwidth-img-1.jpg')] bg-cover bg-no-repeat bg-center">
        <div className='flex flex-col p-4 xl:max-w-[1200px] xl:mx-auto'>
          <Image src='/logo.png' alt='BeClinic' className='mb-[35px]' width={182} height={32} />
          <H3 className='text-[38px] text-white font-normal mb-[30px]'>{t('hero.welcome.title')}</H3>
          <H4 className='mb-6 text-white font-light max-w-[550px] text-base'>{t('hero.welcome.subtitle')}</H4>
          <P className='text-white font-light mb-[50px] max-w-[500px]'>{t('hero.welcome.description')}</P>

          <StyledLinkButton variant='outline-white' href='/contacts' className='w-[250px] border-white text-white'>
            {t('hero.button.contactUs')}
          </StyledLinkButton>
        </div>
      </div>

      <Container>
        <div className='py-4'>
          <H3 className='mb-5 text-[26px] text-center md:text-left'>{t('hero.departments.title')}</H3>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
        </div>

        <Departments />

        <div className='py-4'>
          <H3 className='mb-5 text-[26px] text-center md:text-left'>{t('hero.medicalProfessionals')}</H3>
          <div className='flex items-center justify-center  md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
        </div>

        <div className='flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-4 pt-5'>
          {Array.from({ length: 4 }).map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))}
        </div>

        <div className='pt-8 pb-4 grid grid-cols-2 md:grid-cols-4'>
          {mockedClients.map((item) => (
            <div className='p-2.5' key={item.alt}>
              <Image src={item.image} alt={item.alt} width={540} height={220} />
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default HeroPage
