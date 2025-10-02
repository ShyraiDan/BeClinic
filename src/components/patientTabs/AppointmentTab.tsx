'use client'

import { Plus } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { useGetPatientAppointmentsQuery } from '@/client/appointment'
import AppointmentCard from '@/components/AppointmentCard/AppointmentCard'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { P, H6 } from '@/components/ui/typography'
import { SupportedLocales } from '@/shared/types'

export const AppointmentTab = () => {
  const params = useParams()
  const { data: session } = useSession()
  const { locale } = params
  const searchParams = useSearchParams()

  const pageNumber = parseInt(searchParams.get('page') || '1')
  const pageSizeNumber = parseInt(searchParams.get('pageSize') || '10')

  const t = useTranslations('page')

  const { data: appointmentsData, isLoading } = useGetPatientAppointmentsQuery(
    session?.user?.id || '',
    pageNumber,
    pageSizeNumber
  )

  return (
    <>
      <div className='mt-6 flex justify-between'>
        <H6>{t('profile.patient.makeAnAppointment')}</H6>
        <StyledLinkButton href='/appointments/add' variant='icon' className='p-2.5 bg-[#0674d1]'>
          <Plus fill='#fff' size={16} />
        </StyledLinkButton>
      </div>

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
            {appointmentsData.data.map((appointment) => (
              <AppointmentCard key={appointment._id} appointment={appointment} locale={locale as SupportedLocales} />
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
