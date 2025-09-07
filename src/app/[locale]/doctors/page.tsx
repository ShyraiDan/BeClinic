import { PageHeading } from '@/components/PageHeading/PageHeading'
import { H2, P } from '@/components/ui/typography'
import { Container } from '@/components/ui/container'
import Image from 'next/image'
import { DoctorCardSkeleton } from '@/components/skeletons/DoctorCardSkeletons'
import { useTranslations } from 'next-intl'

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

const DoctorsPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('doctors.title')} />
      <section className='md:grid md:grid-cols-2'>
        <div className=" bg-[url('/department-single-img5.jpg')] bg-cover bg-no-repeat w-full h-[240px] bg-center md:h-[440px] md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2" />
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
          {Array.from({ length: 4 }).map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))}
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
