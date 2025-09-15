import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
// import { unstable_update } from '@/auth'

import { createUserInvoice } from '@/lib/invoices'
import connectMongoDB from '@/lib/mongodb'
import { UserModel } from '@/shared/models'
import { getInvoiceType } from '@/utils/getInvoiceType'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY

export async function POST(req) {
  await connectMongoDB()

  const body = await req.text()

  const head = await headers()
  const signature = head.get('stripe-signature')

  if (!signature) return new Response('Missing signature', { status: 400 })

  let data
  let eventType
  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  data = event.data

  eventType = event.type

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        let user

        const session = await stripe.checkout.sessions.retrieve(data.object.id, {
          expand: ['line_items']
        })

        const customerId = session?.customer
        const customer = await stripe.customers.retrieve(customerId)
        const priceId = session?.line_items?.data[0]?.price.id

        if (customer.email) {
          user = await UserModel.findOne({ email: customer.email })
        } else {
          console.error('No user found')
          throw new Error('No user found')
        }

        await UserModel.findByIdAndUpdate(
          user._id,
          { $set: { priceId, subscription: 'premium' } },
          { new: true, runValidators: true }
        )

        await createUserInvoice({
          userId: user._id,
          amount: session.amount_total ?? 0,
          invoiceType: getInvoiceType(priceId)
        })

        break
      }

      case 'customer.subscription.deleted': {
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        const subscription = await stripe.subscriptions.retrieve(data.object.id)
        const user = await UserModel.findOne({
          customerId: subscription.customer
        })
        user.subscription = 'basic'
        await user.save()

        break
      }

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error('stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType)
  }

  return NextResponse.json({})
}
