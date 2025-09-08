import { enUS, uk } from 'date-fns/locale'

import type { Locale } from 'date-fns'
import type { Locale as NextIntlLocale } from 'next-intl'

export const dateLocaleMap: Record<NextIntlLocale, Locale> = { en: enUS, uk }
