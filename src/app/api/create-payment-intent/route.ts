import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const POST = async (request: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  try {
    const { amount } = (await request.json()) as { amount: number }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'uah',
      automatic_payment_methods: { enabled: true }
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Internal Error: ', error)
    return NextResponse.json({ message: 'Internal Server Error:' }, { status: 500 })
  }
}
