'use client'

import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import { useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useUpdatePaymentMutation } from '@/client/payment'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { P } from '@/components/ui/typography'
import { sendPaymentSuccessEmail } from '@/lib/email'
import { Payment, SupportedLocales } from '@/shared/types'
import { convertToSubCurrency } from '@/utils/convetToSubcurrency'

interface PaymentSubPageProps {
  payment: Payment
}

export const PaymentSubPage = ({ payment }: PaymentSubPageProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { data: session } = useSession()
  const locale = useLocale()

  const { mutateAsync: updatePayment } = useUpdatePaymentMutation(payment._id)

  useEffect(() => {
    void fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: convertToSubCurrency(payment.amount) })
    })
      .then((res) => res.json())
      .then((data: { clientSecret: string }) => {
        setClientSecret(data.clientSecret)
      })
  }, [payment.amount])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) return

    try {
      const { error: submitError } = await elements.submit()

      if (submitError) {
        setErrorMessage(submitError.message)
        setLoading(false)
        return
      }

      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        setErrorMessage('CardElement not found')
        setLoading(false)
        return
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: session?.user.name }
        }
      })

      if (error) {
        setErrorMessage(error.message)
      } else {
        const paymentResult = await updatePayment({
          patientId: session?.user.id ?? '',
          paymentId: payment._id,
          data: {
            _id: payment._id,
            patientId: session?.user.id ?? '',
            appointmentId: payment.appointment._id,
            amount: payment.amount,
            isPayed: true
          }
        })
        await sendPaymentSuccessEmail(locale as SupportedLocales, paymentResult)
        toast.success('Платіж успішно оброблений')
      }

      setLoading(false)
    } catch (error) {
      console.error(error)
      toast.error('Error processing payment')
    }
  }

  return (
    <>
      {!clientSecret || !stripe || !elements ? (
        <div className='flex items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <form onSubmit={(e) => void handleSubmit(e)} className='p-2 mt-2'>
          <div className='mb-4'>
            {clientSecret && (
              <div className='bg-white p-6 shadow-custom-right'>
                <CardElement />
              </div>
            )}
            {errorMessage && <P className='text-red'>{errorMessage}</P>}
          </div>
          <Button
            type='submit'
            className='w-full text-white p-3 bg-black rounded-md font-bold disabled:opacity-50 disabled:animate-pulse mt-6'>
            {!loading ? `Оплатити ₴${payment.amount}` : 'Обробка платежу...'}
          </Button>
        </form>
      )}
    </>
  )
}
