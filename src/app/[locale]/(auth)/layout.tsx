import { hasLocale, type Locale } from 'next-intl'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { routing } from '@/i18n/routing'

interface AuthLayoutProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

const AuthLayout = async ({ children, params }: AuthLayoutProps) => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default AuthLayout
