import Image from 'next/image'
import Link from 'next/link'

import { HeroSlider } from '@/components/HeroSlider/HeroSlider'
import { DoctorCardSkeleton } from '@/components/skeletons/DoctorCardSkeletons'
import { Container } from '@/components/ui/container'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H3, H6, P } from '@/components/ui/typography'
import {
  mockedDepartments,
  mockedDepartmentsTwo,
  mockedDepartmentsOne,
  mockedServicesData,
  mockedClients
} from '@/mocks/HeroPage.mock'
import { Service, Department } from '@/shared/types'
import { getLocale } from 'next-intl/server'

const ServiceItem = ({ item }: { item: Service }) => {
  return (
    <div className='py-4'>
      <Image src={item.icon} alt={item.title} width={50} height={50} />
      <div>
        <H6 className='my-4 font-normal text-xl'>{item.title}</H6>
        <P className='text-[#42474c] font-light text-sm'>{item.description}</P>
      </div>
    </div>
  )
}

const DepartmentsItem = ({ item }: { item: Department }) => {
  return (
    <div className='mx-4 px-2.5 mt-4 pt-[27px] pb-[30px] flex flex-col items-center justify-center transition duration-300 hover:shadow-doctor-card'>
      <Image src={item.icon} alt={item.title} className='mb-4' width={90} height={90} />
      <H6 className='mt-4 mb-2.5 text-xl text-center'>{item.title}</H6>
      <P className='text-[#42474c] font-light text-center'>{item.description}</P>
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
  const locale = await getLocale()

  console.log('locale', locale)

  return (
    <>
      <div>
        <HeroSlider />
      </div>
      <Container className='my-0 pb-0'>
        <div className='mt-[-55px] mb-[34px] bg-[#fff] md:grid md:grid-cols-3 z-[10] relative'>
          <div className='py-5 px-4 border-b-[7px] border-solid border-[#6cc8df]'>
            <H3 className='mb-5 text-blue-100 font-normal text-[26px]'>Графік роботи</H3>
            <div className='mb-5 py-3 border-b border-solid border-[#edeff1]'>
              <P className='flex items-center justify-between'>
                <span className='text-sm font-bold text-[#42474c]'>Пн-Пт:</span>
                <span className='text-blue-100 text-sm font-bold'>9:00 - 18:00</span>
              </P>
            </div>
            <div className='mb-5 py-3 border-b border-solid border-[#edeff1]'>
              <P className='flex items-center justify-between'>
                <span className='text-sm font-bold text-[#42474c]'>Сб:</span>
                <span className='text-blue-100 text-sm font-bold'>10:00-18:00</span>
              </P>
            </div>
            <div className='mb-5 py-3 border-b border-solid border-[#edeff1]'>
              <P className='flex items-center justify-between'>
                <span className='text-sm font-bold text-[#42474c]'>Нд:</span>
                <span className='text-blue-100 text-sm font-bold'>Вихідний</span>
              </P>
            </div>
          </div>

          <div className='py-5 px-4 border-b-[7px] border-solid border-[#56b0d2]'>
            <H3 className='mb-5 text-blue-100 font-normal text-[26px]'>Розклад лікарів</H3>
            <P className='mb-5 text-[#42474c] font-light'>
              Ваш план лікування розрахований на постійний прогрес, з оперативним виконанням кожного етапу.
            </P>
            <StyledLinkButton variant='outline-blue' href='/appointments/add'>
              Записатись на прийом
            </StyledLinkButton>
          </div>

          <div className='py-5 px-4 border-b-[7px] border-solid border-[#2a88c9]'>
            <H3 className='mb-5 text-[#2a93c9] font-normal text-[26px]'>Невідкладні випадки</H3>
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
            <P className='text-[#42474c] font-light'>
              Ваш план лікування розрахований на постійний прогрес, з оперативним виконанням кожного етапу.
            </P>
          </div>
        </div>

        <div className='py-4'>
          <H3 className='mb-5 text-[26px]'>Послуги</H3>
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
          <H3 className='text-[38px] text-white font-normal mb-[30px]'>Вітаємо у нашій клініці!</H3>
          <H6 className='mb-6 text-white font-light max-w-[550px]'>
            Ми пропонуємо широкий спектр медичних процедур для виїзних та приїжджих пацієнтів.
          </H6>
          <P className='text-white font-light mb-[50px] max-w-[500px]'>
            Наші основні напрямки спеціалізації включають онкологію, ортопедію, кардіологію, ЕКЗ, урологію,
            нейрохірургію, гастроентерологію, пластичну хірургію та багато інших відділень.
          </P>

          <StyledLinkButton variant='outline-white' href='/contacts' className='w-[250px] border-white text-white'>
            Зв&apos;яжіться з нами
          </StyledLinkButton>
        </div>
      </div>

      <Container>
        <div className='py-4'>
          <H3 className='mb-5 text-[26px] text-center md:text-left'>Відділи</H3>
          <div className='flex items-center justify-center md:justify-start'>
            <div className='border border-solid border-blue-100 w-[65px]' />
          </div>
        </div>

        <Departments />

        <div className='py-4'>
          <H3 className='mb-5 text-[26px] text-center md:text-left'>Медичні фахівці</H3>
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
