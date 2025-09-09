'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { PaymentCard } from '@/components/PaymentCard/PaymentCard'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { P, H6 } from '@/components/ui/typography'
import { mockedPayments } from '@/mocks/mockedPayments'
import { SupportedLocales } from '@/shared/types'

export const BillingTab = () => {
  const params = useParams()
  const { locale } = params
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
