'use client'

import { useTranslations } from 'next-intl'

import { handleLogout } from '@/app/actions'
import { Button } from '@/components/ui/button'

export const SignOutButton = () => {
  const t = useTranslations('page')

  return (
    <Button className='mt-8 bg-red-100' onClick={() => void handleLogout()}>
      {t('profile.leave')}
    </Button>
  )
}
