import { MetadataRoute } from 'next'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'

const manifest = async (): Promise<MetadataRoute.Manifest> => {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: 'manifest'
  })

  return {
    name: t('name'),
    start_url: '/',
    theme_color: '#101E33'
  }
}

export default manifest
