'use client'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { useGetPaymentsQuery } from '@/client/payment'
import { PaymentCard } from '@/components/PaymentCard/PaymentCard'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { P } from '@/components/ui/typography'
import { SupportedLocales } from '@/shared/types'

export const PaymentTab = () => {
  const params = useParams<Record<string, string | undefined>>()
  const { locale, page, pageSize } = params
  const pageNumber = parseInt(page || '1')
  const pageSizeNumber = parseInt(pageSize || '10')
  const t = useTranslations('page')
  const { data: session } = useSession()
  const { data: paymentsData, isLoading } = useGetPaymentsQuery(session?.user?.id || '', pageNumber, pageSizeNumber)

  return (
    <>
      {paymentsData?.total === 0 && !isLoading && <P>{t('profile.patient.noPaymentHistory')}</P>}

      {isLoading && (
        <div className='grid grid-cols-1 gap-4 mt-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonText className='w-full h-[100px]' key={index} />
          ))}
        </div>
      )}

      {paymentsData?.data && paymentsData?.data.length > 0 && (
        <div className='mt-6'>
          <div className='grid grid-cols-1 gap-4 mt-4'>
            {paymentsData?.data.map((payment) => (
              <PaymentCard key={payment._id} payment={payment} locale={locale as SupportedLocales} />
            ))}
          </div>
          <div className='mt-10'>
            <PaginationWithLinks page={pageNumber} pageSize={pageSizeNumber} totalCount={paymentsData.total} />
          </div>
        </div>
      )}
    </>
  )
}
