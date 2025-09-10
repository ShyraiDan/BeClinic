import { parseISO, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import Link from 'next/link'

import { H6, P } from '@/components/ui/typography'
import { Analysis, SupportedLocales } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

interface AnalysisCardProps {
  analysis: Analysis
  locale: SupportedLocales
}

export const AnalysisCard = ({ analysis, locale }: AnalysisCardProps) => {
  const dateLocale = dateLocaleMap[locale] ?? enUS

  return (
    <Link href={`/analyses/${analysis._id}`}>
      <div className='flex shadow-custom-right bg-white'>
        <div className='w-2 bg-blue-100' />
        <div className='py-4 pr-4 pl-3 flex flex-col'>
          <H6>{analysis.analysisName}</H6>
          <P className='capitalize'>
            {format(parseISO(analysis.createdAt), 'MMM dd, yyyy HH:mm', { locale: dateLocale })}
          </P>
        </div>
      </div>
    </Link>
  )
}
