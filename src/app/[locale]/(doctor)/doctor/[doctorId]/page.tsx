import { User } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { DoctorAppointmentTab } from '@/components/doctorTabs/DoctorAppointmentTab'
import { DoctorCalendarTab } from '@/components/doctorTabs/DoctorCalendarTab'
import { EditDoctorModal } from '@/components/modals/EditDoctorModal/EditDoctorModal'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { SignOutButton } from '@/components/SignOutButton/SignOutButton'
import { StyledTab } from '@/components/StyledTab/StyledTab'
import { Container, LoadingContainer } from '@/components/ui/container'
import { H2, H6, P } from '@/components/ui/typography'
import { getDoctor } from '@/lib/doctors'
import { BUCKET_URL } from '@/shared/constants'

const TABS_ENUM = {
  APPOINTMENTS: 'appointments',
  CALENDAR: 'calendar'
}

interface DoctorProfileProps {
  doctorId: string
}

const DoctorProfile = async ({ doctorId }: DoctorProfileProps) => {
  const doctor = await getDoctor(doctorId)

  if (!doctor) return notFound()

  const t = await getTranslations('page')

  return (
    <div className='inset-shadow-profile bg-white py-[30px] px-4'>
      <div className='mt-12 flex flex-col items-center justify-center relative lg:mt-6'>
        {doctor && <EditDoctorModal doctor={doctor} />}

        {doctor?.avatarUrl ? (
          <Image
            src={`${BUCKET_URL}/custom/avatars/${doctor.avatarUrl}`}
            width={80}
            height={80}
            alt='User avatar'
            unoptimized
            className='w-[80px] h-[80px] rounded-full'
          />
        ) : (
          <div className='flex items-center justify-center w-[80px] h-[80px] bg-blue-100 rounded-full'>
            <User size={24} className='text-white' />
          </div>
        )}

        <P className='px-4 line-clamp-2 text-lg font-bold mt-2'>{doctor?.doctorName}</P>

        <div className='w-full'>
          <H2 className='text-lg mb-4 mt-6'>{t('profile.personalInfo')}</H2>
          <ul className='flex flex-col gap-3 md:grid md:grid-cols-3 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>{t('profile.doctor.speciality')}</P>

              <H6 className='text-lg'>{doctor?.position || '-'}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>E-mail</P>

              <H6 className='text-lg'>{doctor?.email || '-'}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.phoneNumber')}</P>

              <H6 className='text-lg'>{doctor?.phone || '-'}</H6>
            </li>
          </ul>
        </div>
        <div className='w-full'>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}

const tabs = [
  { id: TABS_ENUM.APPOINTMENTS, label: 'profile.doctor.appointments', content: <DoctorAppointmentTab /> },
  { id: TABS_ENUM.CALENDAR, label: 'profile.doctor.calendar', content: <DoctorCalendarTab /> }
]

interface DoctorProfilePageProps {
  params: Promise<{ doctorId: string }>
}

const DoctorProfilePage = async ({ params }: DoctorProfilePageProps) => {
  const { doctorId } = await params

  const t = await getTranslations('page')

  return (
    <>
      <PageHeading title={t('profile.doctor.title')} />
      <Suspense fallback={<LoadingContainer />}>
        <Container className='lg:grid lg:grid-cols-[1fr_270px] lg:gap-4 xl:grid-cols-[1fr_320px]'>
          <div className='mb-[30px] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:mb-0'>
            <DoctorProfile doctorId={doctorId} />
          </div>
          <div className='lg:col-start-1 lg:col-end-2 lg:row-start-1'>
            <StyledTab tabs={tabs} />
          </div>
        </Container>
      </Suspense>
    </>
  )
}

export default DoctorProfilePage
