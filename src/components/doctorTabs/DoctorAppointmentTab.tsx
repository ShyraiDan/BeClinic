'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { useGetDoctorAppointmentsQuery } from '@/client/appointment'
import { DoctorAppointmentCard } from '@/components/DoctorAppointmentCard/DoctorAppointmentCard'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { H6, P } from '@/components/ui/typography'
import { SupportedLocales } from '@/shared/types'

import { PaginationWithLinks } from '../ui/pagination-with-links'

export const DoctorAppointmentTab = () => {
  const params = useParams()
  const { locale } = params
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const pageNumber = parseInt(searchParams.get('page') || '1')
  const pageSizeNumber = parseInt(searchParams.get('pageSize') || '2')

  const t = useTranslations('page')

  const { data: appointmentsData, isLoading } = useGetDoctorAppointmentsQuery(
    session?.user?.id || '',
    pageNumber,
    pageSizeNumber
  )

  return (
    <>
      {appointmentsData?.data?.length === 0 && !isLoading && <P>{t('profile.patient.noAppointments')}</P>}

      {isLoading && (
        <div className='grid grid-cols-1 gap-4 mt-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonText className='w-full h-[84px]' key={index} />
          ))}
        </div>
      )}

      {appointmentsData && appointmentsData?.data?.length > 0 && (
        <div className='mt-6'>
          <H6>{t('profile.patient.appointments')}</H6>

          <div className='grid grid-cols-1 gap-4 mt-4'>
            {appointmentsData?.data?.map((appointment) => (
              <DoctorAppointmentCard
                key={appointment._id}
                doctorId={session?.user?.id || ''}
                appointment={appointment}
                locale={locale as SupportedLocales}
              />
            ))}
          </div>
          <div className='mt-10'>
            <PaginationWithLinks page={pageNumber} pageSize={pageSizeNumber} totalCount={appointmentsData.total} />
          </div>
        </div>
      )}
    </>
  )
}
