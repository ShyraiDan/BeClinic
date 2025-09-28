import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useTranslations } from 'next-intl'

import { PaymentModal } from '@/components/modals/PaymentModal/PaymentModal'
import { H6, P } from '@/components/ui/typography'
import { SupportedLocales, Payment } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'
import { cn } from '@/utils/utils'

interface PaymentCardProps {
  payment: Payment
  locale: SupportedLocales
  isUnPayed?: boolean
}

export const PaymentCard = ({ payment, isUnPayed, locale }: PaymentCardProps) => {
  const dateLocale = dateLocaleMap[locale] ?? enUS
  const t = useTranslations('page')

  return (
    <div className='flex inset-shadow-profile bg-white w-full'>
      <div className={cn('w-2 bg-blue-100', isUnPayed && 'bg-orange-400')} />
      <div className='py-4 pr-4 pl-3 flex flex-col w-full'>
        <H6>
          {t('profile.patient.paymentCardTitle', {
            doctorPosition: t(`profile.doctor.specialties.${payment.appointment.position}`),
            doctorName: payment.appointment.doctorName
          })}
        </H6>
        <P className='capitalize'>{format(payment.createdAt, 'MMM dd, yyyy HH:mm', { locale: dateLocale })}</P>
        {payment.isPayed ? (
          <P>
            {t('profile.patient.paid')}: {payment.amount}
          </P>
        ) : (
          <div className='flex items-center justify-between w-full'>
            <P>{t('profile.patient.needToPay', { money: payment.amount })} </P>
            <PaymentModal payment={payment} />
          </div>
        )}
      </div>
    </div>
  )
}
