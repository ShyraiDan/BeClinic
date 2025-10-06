import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H6, P } from '@/components/ui/typography'
import { DoctorAppointment, SupportedLocales } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

interface AppointmentInfoModalProps {
  appointment: DoctorAppointment
  open: boolean
  handleClose: () => void
}

export const AppointmentInfoModal = ({ handleClose, appointment, open }: AppointmentInfoModalProps) => {
  const t = useTranslations('page')
  const { locale } = useParams()

  const dateLocale = dateLocaleMap[locale as SupportedLocales] ?? enUS

  const handleOpenChange = () => {
    if (open) {
      handleClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => handleOpenChange()}>
      <DialogContent className='border-none'>
        <div className='flex flex-col w-full'>
          <DialogTitle>{appointment.patient.userName}</DialogTitle>
          <P className='capitalize'>
            {format(appointment.startTime, 'MMM dd, yyyy HH:mm', { locale: dateLocale })} -{' '}
            {format(appointment.endTime, 'MMM dd, yyyy HH:mm', { locale: dateLocale })}
          </P>
          <div className='my-2'>
            <H6>{t('profile.doctor.appointmentReason')}</H6>
            <P>{appointment.reason || '-'}</P>
          </div>
          <div className='mb-2'>
            <H6>{t('profile.doctor.appointmentDetails')}</H6>
            <P>{appointment.description || '-'}</P>
          </div>

          <div className='mt-4 flex'>
            <StyledLinkButton
              href={`/appointments/${appointment._id}`}
              className='bg-blue-100 tracking-normal font-bold text-white'>
              {t('profile.doctor.moveToVisit')}
            </StyledLinkButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
