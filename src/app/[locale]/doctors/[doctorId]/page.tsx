import { getYear } from 'date-fns'
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { ReviewSlider } from '@/components/ReviewSlider/ReviewSlider'
import { StyledAccordion } from '@/components/StyledAccordion/StyledAccordion'
import { Container } from '@/components/ui/container'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H3, H6, P } from '@/components/ui/typography'
import { Link } from '@/i18n/navigation'
import { getSingleDoctor } from '@/lib/doctors'
import { mockedReviews } from '@/mocks/Reviews.mocks'
import { BUCKET_URL } from '@/shared/constants'
import { Doctor, UserRoles } from '@/shared/types'

interface DoctorInfoProps {
  doctor: Doctor
}

const DoctorInfo = async ({ doctor }: DoctorInfoProps) => {
  const t = await getTranslations('page')
  const session = await auth()

  return (
    <div className='bg-white inset-shadow-profile px-4 py-[30px]'>
      <H3 className='text-black text-[26px] mb-5'>{t('singleDoctorPage.aboutDoctor')}</H3>
      <ul>
        <li className='py-3 border-b border-solid border-[#e1e5e3]'>
          <P className='flex items-center justify-between text-[#64727d]'>
            <span>{t('singleDoctorPage.doctorName')}</span>
            <span>{doctor?.doctorName}</span>
          </P>
        </li>
        <li className='py-3 border-b border-solid border-[#e1e5e3]'>
          <P className='flex items-center justify-between text-[#64727d]'>
            <span>{t('singleDoctorPage.doctorPosition')}</span>
            <span>{t(`profile.doctor.specialties.${doctor.position}`)}</span>
          </P>
        </li>
        <li className='py-3 border-b border-solid border-[#e1e5e3]'>
          <P className='flex items-center justify-between text-[#64727d]'>
            <span>{t('singleDoctorPage.doctorEducation')}</span>
            <span>ВНМУ ім. М.І. Пирогова</span>
          </P>
        </li>
        <li className='py-3'>
          <P className='flex items-center justify-between text-[#64727d]'>
            <span>{t('singleDoctorPage.doctorExperience')}</span>
            <span>{t('singleDoctorPage.years', { years: getYear(new Date()) - getYear(doctor?.createdAt) + 1 })}</span>
          </P>
        </li>
      </ul>
      {session?.user.id && session?.user.role === UserRoles.PATIENT && (
        <div className='mt-[55px]'>
          <StyledLinkButton href='/appointments/add' className='w-full text-center bg-blue-100 text-white'>
            {t('singleDoctorPage.makeAnAppointment')}
          </StyledLinkButton>
        </div>
      )}
    </div>
  )
}

interface SingleDoctorPageProps {
  params: Promise<{ doctorId: string }>
}

const SingleDoctorPage = async ({ params }: SingleDoctorPageProps) => {
  const { doctorId } = await params

  const doctor = await getSingleDoctor(doctorId)
  const t = await getTranslations('page')

  return (
    <>
      <PageHeading title={doctor?.doctorName} />
      <Container className='my-12 md:grid md:grid-cols-[3fr_2fr] md:gap-7 lg:grid-cols-[1fr_360px]'>
        <section>
          {doctor?.avatarUrl ? (
            <Image
              src={`${BUCKET_URL}/custom/avatars/${doctor.avatarUrl}`}
              alt='doctor'
              unoptimized
              className='w-full h-full max-h-[440px] mb-10 object-cover'
              width={730}
              height={440}
            />
          ) : (
            <Image
              src='/no-image.jpg'
              alt='doctor'
              className='w-full h-full max-h-[440px] mb-10 object-cover'
              width={730}
              height={440}
            />
          )}
          <div>
            <div className='flex items-center justify-start'>
              <div className='border border-solid border-[#56b0d2] w-[65px]' />
            </div>
            <ul className='mt-6 mb-3 flex gap-5'>
              <li>
                <Link href='https://www.linkedin.com/'>
                  <Linkedin
                    size={18}
                    className='text-[#909aa3] transition-all duration-300 ease-in-out hover:text-blue-100'
                  />
                </Link>
              </li>
              <li>
                <Link href='https://x.com/'>
                  <Twitter
                    size={18}
                    className='text-[#909aa3] transition-all duration-300 ease-in-out hover:text-blue-100'
                  />
                </Link>
              </li>
              <li>
                <Link href='https://www.facebook.com/'>
                  <Facebook
                    size={18}
                    className='text-[#909aa3] transition-all duration-300 ease-in-out hover:text-blue-100'
                  />
                </Link>
              </li>
              <li>
                <Link href={`mailto:${doctor?.email}`}>
                  <Mail
                    size={18}
                    className='text-[#909aa3] transition-all duration-300 ease-in-out hover:text-blue-100'
                  />
                </Link>
              </li>
            </ul>
            <P className='mt-6 mb-[48px] font-light'>{t('singleDoctorPage.doctorDescription')}</P>

            <div className='mb-12 md:hidden'>
              <DoctorInfo doctor={doctor} />
            </div>

            <StyledAccordion
              items={[
                {
                  id: 'review',
                  trigger: <span>{t('singleDoctorPage.doctorAccordion.review.title')}</span>,
                  content: (
                    <div className='pt-2.5 pb-5 px-4'>
                      <ul className='mt-2.5'>
                        <li>
                          <span className='font-primary font-bold text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.programs.title')}
                          </span>
                          <span className='ml-2 font-light text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.programs.content')}
                          </span>
                        </li>
                        <li>
                          <span className='font-primary font-bold text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.scienceInterests.title')}
                          </span>
                          <span className='ml-2 font-light text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.scienceInterests.content')}
                          </span>
                        </li>
                        <li>
                          <span className='font-primary font-bold text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.training.title')}
                          </span>
                          <span className='ml-2 font-light text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.training.content')}
                          </span>
                        </li>
                        <li>
                          <span className='font-primary font-bold text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.certificates.title')}
                          </span>
                          <span className='ml-2 font-light text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.certificates.content')}
                          </span>
                        </li>
                        <li>
                          <span className='font-primary font-bold text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.insurances.title')}
                          </span>
                          <span className='ml-2 font-light text-primary'>
                            {t('singleDoctorPage.doctorAccordion.review.content.insurances.content')}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )
                },
                {
                  id: 'awards',
                  trigger: <span>{t('singleDoctorPage.doctorAccordion.awards.title')}</span>,
                  content: (
                    <div className='py-5 px-4'>
                      <P className='font-light'>{t('singleDoctorPage.doctorAccordion.awards.content')}</P>
                    </div>
                  )
                },
                {
                  id: 'membership',
                  trigger: <span>{t('singleDoctorPage.doctorAccordion.membership.title')}</span>,
                  content: (
                    <div className='py-5 px-4'>
                      <P className='font-light'>{t('singleDoctorPage.doctorAccordion.membership.content')}</P>
                    </div>
                  )
                }
              ]}
            />

            <H6 className='mb-5 mt-12 text-[26px]'>{t('singleDoctorPage.review')}</H6>
            <div className='md:max-w-[500px] md:mx-auto'>
              <ReviewSlider reviews={mockedReviews} />
            </div>
          </div>
        </section>
        <section className='hidden md:block'>
          <DoctorInfo doctor={doctor} />
        </section>
      </Container>
    </>
  )
}

export default SingleDoctorPage
