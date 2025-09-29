import { format } from 'date-fns'
import { User } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { EditPatientModal } from '@/components/modals/EditPatientModal/EditPatientModal'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { AnalysesTab } from '@/components/patientTabs/AnalysesTab'
import { AppointmentTab } from '@/components/patientTabs/AppointmentTab'
import { PaymentTab } from '@/components/patientTabs/PaymentTab'
import { ProfileTab } from '@/components/ProfileTab/ProfileTab'
import { SignOutButton } from '@/components/SignOutButton/SignOutButton'
import { Container, LoadingContainer } from '@/components/ui/container'
import { P, H2, H6, H4 } from '@/components/ui/typography'
import { getPatient } from '@/lib/patient'
import { BUCKET_URL } from '@/shared/constants'

const TABS_ENUM = {
  APPOINTMENTS: 'appointments',
  ANALYSES: 'analyses',
  PAYMENT: 'payment'
}

interface PatientProfileProps {
  patientId: string
}

const PatientProfile = async ({ patientId }: PatientProfileProps) => {
  const patient = await getPatient(patientId)

  if (!patient) return notFound()

  const t = await getTranslations('page')

  return (
    <div className='inset-shadow-profile bg-white py-[30px] px-4'>
      <div className='mt-12 flex flex-col items-center justify-center relative lg:mt-6'>
        {patient && <EditPatientModal patient={patient} />}

        {patient?.avatarUrl ? (
          <Image
            src={`${BUCKET_URL}/custom/avatars/${patient.avatarUrl}`}
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

        <P className='px-4 line-clamp-2 text-lg font-bold mt-2'>{patient.userName}</P>

        <div className='w-full'>
          <H2 className='text-lg mb-4 mt-6'>{t('profile.personalInfo')}</H2>
          <ul className='flex flex-col gap-3 md:grid md:grid-cols-3 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>{t('profile.dateOfBirth')}</P>

              <H6 className='text-lg'>{patient.dateOfBirth ? format(patient.dateOfBirth, 'dd.MM.yyyy') : '-'}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>E-mail</P>

              <H6 className='text-lg'>{patient.email}</H6>
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.phoneNumber')}</P>

              <H6 className='text-lg'>{patient.phoneNumber || '-'}</H6>
            </li>
          </ul>
        </div>
        <div className='w-full'>
          <H4 className='text-lg mb-4 mt-6'>{t('profile.patient.signalMarks')}</H4>
          <ul className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2'>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.bloodType')}</P>
              <P className='font-medium'>{patient.bloodType || '-'}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.diabetes')}</P>
              <P className='font-medium'>{patient.diabetes || t('profile.patient.no')}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.rhFactor')}</P>
              <P className='font-medium'>{patient.rhFactor || '-'}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.bloodTransfusion')}</P>
              <P className='font-medium'>{patient.bloodTransfusion || t('profile.patient.no')}</P>
            </li>
          </ul>
          <ul className='flex flex-col gap-3 mt-6 md:grid md:grid-cols-2 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.intoleranceToMedicines')}</P>
              <P className='font-medium'>{patient.intoleranceToMedicines || t('profile.patient.no')}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.infectiousDiseases')}</P>
              <P className='font-medium'>{patient.infectiousDiseases || t('profile.patient.no')}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.surgicalInterventions')}</P>
              <P className='font-medium'>{patient.surgicalInterventions || t('profile.patient.no')}</P>
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.allergies')}</P>
              <P className='font-medium'>{patient.allergies || t('profile.patient.no')}</P>
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
  { id: TABS_ENUM.APPOINTMENTS, label: 'profile.patient.appointments', content: <AppointmentTab /> },
  { id: TABS_ENUM.ANALYSES, label: 'profile.patient.analyses', content: <AnalysesTab /> },
  { id: TABS_ENUM.PAYMENT, label: 'profile.patient.payment', content: <PaymentTab /> }
]

interface PatientProfilePageProps {
  params: Promise<{ patientId: string }>
}

const PatientProfilePage = async ({ params }: PatientProfilePageProps) => {
  const { patientId } = await params
  const t = await getTranslations('page')

  return (
    <>
      <PageHeading title={t('profile.patient.title')} />
      <Suspense fallback={<LoadingContainer />}>
        <Container className='lg:grid lg:grid-cols-[1fr_270px] lg:gap-4 xl:grid-cols-[1fr_320px]'>
          <div className='mb-[30px] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:mb-0'>
            <PatientProfile patientId={patientId} />
          </div>
          <div className='lg:col-start-1 lg:col-end-2 lg:row-start-1'>
            <ProfileTab tabs={tabs} baseUrl={`/doctor/${patientId}`} />
          </div>
        </Container>
      </Suspense>
    </>
  )
}

export default PatientProfilePage
