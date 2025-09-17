'use client'

import { isAfter, isBefore, parseISO } from 'date-fns'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import useSWR from 'swr'

import AppointmentCard from '@/components/AppointmentCard/AppointmentCard'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { P, H6 } from '@/components/ui/typography'
import { PatientAppointment, SupportedLocales } from '@/shared/types'
import { fetcher } from '@/utils/fetcher'

export const AppointmentTab = () => {
  const params = useParams()
  const { data: session } = useSession()
  const { locale } = params

  const t = useTranslations('page')

  const { data: appointments, isLoading } = useSWR<PatientAppointment[]>(
    `/api/appointments/patient/${session?.user?.id}`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false
    }
  )

  const futureAppointments = useMemo(
    () => appointments?.filter((appointment) => isAfter(parseISO(appointment.endTime), new Date())) || [],
    [appointments]
  )

  const pastAppointments = useMemo(
    () => appointments?.filter((appointment) => isBefore(parseISO(appointment.endTime), new Date())) || [],
    [appointments]
  )

  return (
    <>
      <div className='mt-6 flex justify-between'>
        <H6>{t('profile.patient.makeAnAppointment')}</H6>
        <StyledLinkButton href='/appointments/add' variant='icon' className='p-2.5 bg-[#0674d1]'>
          <Plus fill='#fff' size={16} />
        </StyledLinkButton>
      </div>

      {futureAppointments.length === 0 && pastAppointments.length === 0 && !isLoading && (
        <P>{t('profile.patient.noAppointments')}</P>
      )}

      {isLoading && (
        <div className='grid grid-cols-1 gap-4 mt-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonText className='w-full h-[84px]' key={index} />
          ))}
        </div>
      )}

      {futureAppointments.length > 0 && (
        <div className='mt-6'>
          <H6>{t('profile.patient.appointments')}</H6>

          {futureAppointments.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {futureAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  isIncoming
                  locale={locale as SupportedLocales}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {pastAppointments.length > 0 && (
        <div className='mt-6'>
          <H6>{t('profile.patient.historyAppointments')}</H6>

          {pastAppointments.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {pastAppointments.map((appointment) => (
                <AppointmentCard key={appointment._id} appointment={appointment} locale={locale as SupportedLocales} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
