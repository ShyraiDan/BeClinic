import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import Link from 'next/link'

import { H6, P } from '@/components/ui/typography'
import { Appointment, SupportedLocales } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'
import { cn } from '@/utils/utils'

interface DoctorAppointmentCardProps {
  appointment: Appointment
  locale: SupportedLocales
  isIncoming?: boolean
}

export const DoctorAppointmentCard = ({ appointment, locale, isIncoming }: DoctorAppointmentCardProps) => {
  const dateLocale = dateLocaleMap[locale] ?? enUS

  return (
    <Link href={`/appointments/${appointment._id}`}>
      <div className='flex inset-shadow-profile bg-white'>
        <div className={cn('w-2 bg-blue-100', isIncoming && 'bg-orange-400')} />
        <div className='py-4 pr-4 pl-3 flex flex-col'>
          <H6>
            {appointment.patient.userName}. {appointment.doctor.position}
          </H6>
          <P className='capitalize'>
            {format(appointment.startTime, 'MMM dd, yyyy HH:mm', { locale: dateLocale })} -{' '}
            {format(appointment.endTime, 'MMM dd, yyyy HH:mm', { locale: dateLocale })}
          </P>
        </div>
      </div>
    </Link>
  )
}
