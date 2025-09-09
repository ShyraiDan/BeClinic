'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { PageHeading } from '@/components/PageHeading/PageHeading'
import { PaymentCard } from '@/components/PaymentCard/PaymentCard'
import { SkeletonAvatar } from '@/components/skeletons/SkeletonAvatar'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { StyledTab } from '@/components/StyledTab/StyledTab'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { P, H2, H6, H4 } from '@/components/ui/typography'
import { mockPatient } from '@/mocks/mockedPatient.mock'
import { mockedPayments } from '@/mocks/mockedPayments'
import { SupportedLocales } from '@/shared/types'

const TABS_ENUM = {
  APPOINTMENTS: 'appointments',
  ANALYZES: 'analyzes',
  BILLING: 'billing'
}

interface PatientProfileProps {
  params: Promise<{ patientId: string }>
}

const PatientProfile = ({ params }: PatientProfileProps) => {
  const t = useTranslations('page')

  const isLoading = true
  const patient = mockPatient

  return (
    <div className='shadow-custom-right bg-white py-[30px] px-4'>
      <div className='mt-12 flex flex-col items-center justify-center relative lg:mt-6'>
        {/* {patientProfile && <EditProfileModal patient={patientProfile} />} */}

        <SkeletonAvatar />

        {/* {isLoading ? (
          <SkeletonAvatar />
        ) : patient?.image ? (
          <Image
            src={`${BUCKET_URL}/custom/avatars/${patient.image}`}
            width={80}
            height={80}
            alt='User avatar'
            unoptimized
            className='w-[80px] h-[80px] rounded-full'
          />
        ) : (
          <div className='flex items-center justify-center w-[80px] h-[80px] bg-blue-100 rounded-full'>
            <User size={24} fill='#fff' />
          </div>
        )} */}

        {isLoading ? (
          <SkeletonText className='px-4 mt-2 h-7 w-[180px]' />
        ) : (
          <P className='px-4 line-clamp-2 text-lg font-bold mt-2'>{patient?.userName}</P>
        )}

        <div className='w-full'>
          <H2 className='text-lg mb-4 mt-6'>{t('profile.personalInfo')}</H2>
          <ul className='flex flex-col gap-3 md:grid md:grid-cols-3 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>{t('profile.dateOfBirth')}</P>

              {isLoading ? (
                <SkeletonText className='h-5 w-[180px] mt-2 mb-1' />
              ) : (
                <H6 className='text-lg'>{patient?.dateOfBirth || '-'}</H6>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>E-mail</P>

              {isLoading ? (
                <SkeletonText className='h-5 w-[180px] mt-2 mb-1' />
              ) : (
                <H6 className='text-lg'>{patient?.email}</H6>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.phoneNumber')}</P>

              {isLoading ? (
                <SkeletonText className='h-5 w-[180px] mt-2 mb-1' />
              ) : (
                <H6 className='text-lg'>{patient?.phoneNumber || '-'}</H6>
              )}
            </li>
          </ul>
        </div>
        <div className='w-full'>
          <H4 className='text-lg mb-4 mt-6'>{t('profile.patient.signalMarks')}</H4>
          <ul className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2'>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.bloodType')}</P>

              {isLoading ? (
                <SkeletonText className='h-4 w-[100px] mt-2 mb-1' />
              ) : (
                <P className='font-medium'>{patient?.bloodType || '-'}</P>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.diabetes')}</P>
              {isLoading ? (
                <SkeletonText className='h-4 w-[100px] mt-2 mb-1' />
              ) : (
                <P className='font-medium'>{patient?.diabetes || 'ні'}</P>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.rhFactor')}</P>
              {isLoading ? (
                <SkeletonText className='h-4 w-[100px] mt-2 mb-1' />
              ) : (
                <P className='font-medium'>{patient?.rhFactor || '-'}</P>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.bloodTransfusion')}</P>
              {isLoading ? (
                <SkeletonText className='h-4 w-[100px] mt-2 mb-1' />
              ) : (
                <P className='font-medium'>{patient?.bloodTransfusion || 'ні'}</P>
              )}
            </li>
          </ul>
          <ul className='flex flex-col gap-3 mt-6 md:grid md:grid-cols-2 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.intoleranceToMedicines')}</P>
              {isLoading ? (
                <SkeletonText className='h-4 w-[180px] mt-2 mb-1' />
              ) : (
                <P className='font-medium'>{patient?.intoleranceToMedicines || 'ні'}</P>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.infectiousDiseases')}</P>
              {isLoading ? (
                <SkeletonText className='h-4 w-[180px] mt-2 mb-1' />
              ) : (
                <P className='font-medium'>{patient?.infectiousDiseases || 'ні'}</P>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.surgicalInterventions')}</P>
              {isLoading ? (
                <SkeletonText className='h-4 w-[180px] mt-2 mb-1' />
              ) : (
                <P className='font-medium'>{patient?.surgicalInterventions || 'ні'}</P>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>{t('profile.patient.allergies')}</P>
              {isLoading ? (
                <SkeletonText className='h-4 w-[180px] mt-2 mb-1' />
              ) : (
                <P className='font-medium'>{patient?.allergies || 'ні'}</P>
              )}
            </li>
          </ul>
        </div>
        <div className='w-full'>
          <Button className='mt-8 bg-red'>{t('profile.leave')}</Button>
        </div>
      </div>
    </div>
  )
}

const BillingTab = () => {
  const params = useParams()
  const { patientId, locale } = params
  const t = useTranslations('page')

  const payments = mockedPayments
  const isLoading = false

  const unPayedServices = useMemo(() => payments?.filter((payment) => !payment.isPayed) ?? [], [payments])
  const payedServices = useMemo(() => payments?.filter((payment) => !!payment.isPayed) ?? [], [payments])

  return (
    <>
      {unPayedServices.length === 0 && payedServices.length === 0 && !isLoading && (
        <P>{t('profile.patient.noBillingHistory')}</P>
      )}

      {isLoading && (
        <div className='grid grid-cols-1 gap-4 mt-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonText className='w-full h-[100px]' key={index} />
          ))}
        </div>
      )}

      {unPayedServices.length > 0 && (
        <div className='mt-6'>
          <H6>{t('profile.patient.unpaidBills')}</H6>

          {unPayedServices.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {unPayedServices.map((payment) => (
                <PaymentCard key={payment._id} payment={payment} isUnPayed locale={locale as SupportedLocales} />
              ))}
            </div>
          )}
        </div>
      )}

      {payedServices.length > 0 && (
        <div className='mt-6'>
          <H6>{t('profile.patient.billingHistory')}</H6>

          {payedServices.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {payedServices.map((payment) => (
                <PaymentCard key={payment._id} payment={payment} locale={locale as SupportedLocales} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

const tabs = [{ id: TABS_ENUM.BILLING, label: 'profile.patient.billing', content: <BillingTab /> }]

interface PatientProfileProps {
  params: Promise<{ patientId: string }>
}

const PatientProfilePage = ({ params }: PatientProfileProps) => {
  return (
    <>
      <PageHeading title='Ваш профіль' />
      <Container className='lg:grid lg:grid-cols-[1fr_270px] lg:gap-4 xl:grid-cols-[1fr_320px]'>
        <div className='mb-[30px] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:mb-0'>
          <PatientProfile params={params} />
        </div>
        <div className='lg:col-start-1 lg:col-end-2 lg:row-start-1'>
          <StyledTab tabs={tabs} defaultValue={tabs[0].id} />

          {/* <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab)
              router.push(`?tab=${tab}`)
            }}
          /> */}
        </div>
      </Container>
    </>
  )
}

export default PatientProfilePage
