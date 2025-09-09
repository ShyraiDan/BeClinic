import { parseISO, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useTranslations } from 'next-intl'

import { H6, P } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { SupportedLocales, Payment } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

interface PaymentCardProps {
  payment: Payment
  locale: SupportedLocales
  isUnPayed?: boolean
}

export const PaymentCard = ({ payment, isUnPayed, locale }: PaymentCardProps) => {
  const dateLocale = dateLocaleMap[locale] ?? enUS
  const t = useTranslations('page')

  return (
    <div className='flex shadow-custom-right bg-white w-full'>
      <div className={cn('w-2 bg-blue-100', isUnPayed && 'bg-orange-400')} />
      <div className='py-4 pr-4 pl-3 flex flex-col w-full'>
        <H6>
          {t('profile.patient.paymentCardTitle', {
            doctorPosition: payment.appointment.doctor.position,
            doctorName: payment.appointment.doctor.doctorName
          })}
        </H6>
        <P className='capitalize'>
          {format(parseISO(payment.createdAt), 'MMM dd, yyyy HH:mm', { locale: dateLocale })}
        </P>
        {payment.isPayed ? (
          <P>{t('profile.patient.paid')}</P>
        ) : (
          <div className='flex items-center justify-between w-full'>
            <P>{t('profile.patient.needToPay', { money: payment.amount })} </P>
            {/* <PaymentModal appointment={payment.appointment} payment={payment} /> */}
          </div>
        )}
      </div>
    </div>
  )
}
