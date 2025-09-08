import { SUPPORTED_LOCALES } from '@/shared/constants'
export type Locale = (typeof SUPPORTED_LOCALES)[number]

type LocalizedString = Record<Locale, string>

export const toLocalizedDefaults = (src?: Partial<LocalizedString>): LocalizedString =>
  SUPPORTED_LOCALES.reduce((acc, l) => {
    acc[l] = src?.[l] ?? ''
    return acc
  }, {} as LocalizedString)
