import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Jost, Roboto } from 'next/font/google'
import { notFound } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getLocale, getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

import { auth } from '@/auth'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Toaster } from '@/components/ui/sonner'
import { routing } from '@/i18n/routing'

import type { Metadata } from 'next'

import './globals.css'

const roboto = Roboto({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--primary-font',
  style: ['normal']
})

const jost = Jost({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--secondary-font',
  style: ['normal']
})

interface RootLayoutProps {
  children: ReactNode
}

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: 'seo.index' })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_PRODUCTION_URL!),
    applicationName: t('title'),
    title: t('title'),
    description: t('description'),

    keywords: ['медицина', 'онлайн запис', 'лікарі', 'онлайн медкарта', 'clinic', 'appointments', 'аналіз', 'analysis'],
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/${locale}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/en`,
        uk: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/uk`
      }
    },
    openGraph: {
      type: 'website',
      url: process.env.NEXT_PUBLIC_PRODUCTION_URL!,
      siteName: t('title'),
      title: t('title'),
      description: t('description'),
      images: [
        { url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/favicon.ico`, width: 1200, height: 630, alt: 'BeClinic' }
      ],
      locale: 'uk_UA',
      alternateLocale: ['en_US']
    }
  }
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const locale = await getLocale()
  const messages = await getMessages()
  setRequestLocale(locale)
  const session = await auth()

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={`${roboto.variable} ${jost.variable} bg-[#f7f7f7] antialiased`}>
        <SessionProvider session={session}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header session={session} />
            <main>{children}</main>
            <Footer />

            <Toaster richColors />
          </NextIntlClientProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
