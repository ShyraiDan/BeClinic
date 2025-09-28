'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useTranslations } from 'next-intl'

import { PaymentSubPage } from '@/components/PaymentSubPage/PaymentSubPage'
import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Payment } from '@/shared/types'
import { convertToSubCurrency } from '@/utils/convetToSubcurrency'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

interface PaymentModalProps {
  payment: Payment
}

export const PaymentModal = ({ payment }: PaymentModalProps) => {
  const t = useTranslations('modals')

  return (
    <StyledModal triggerButton={<Button className='mt-4'>{t('payment.pay')}</Button>}>
      <DialogHeader>
        <DialogTitle>{t('payment.payment')}</DialogTitle>
      </DialogHeader>
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubCurrency(1000),
          currency: 'uah'
        }}>
        <PaymentSubPage payment={payment} />
      </Elements>
    </StyledModal>
  )
}
