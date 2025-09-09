'use client'

import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { AnalysesCard } from '@/components/AnalyzesCard/AnalyzesCard'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { P, H6 } from '@/components/ui/typography'
import { mockedAnalyzes } from '@/mocks/mockedAnalyzes'
import { SupportedLocales } from '@/shared/types'

export const AnalyzesTab = () => {
  const params = useParams()
  const { locale } = params

  const analyses = mockedAnalyzes
  const isLoading = false

  const t = useTranslations('page')

  return (
    <>
      <div className='mt-6 flex justify-between'>
        <H6>{t('profile.patient.addAnalyzes')}</H6>
        <StyledLinkButton href='/analyses/add' variant='icon' className='p-2.5 bg-[#0674d1]'>
          <Plus fill='#fff' size={16} />
        </StyledLinkButton>
      </div>

      {(!analyses || analyses?.length === 0) && !isLoading && <P>{t('profile.patient.noAnalyzes')}</P>}

      {isLoading && (
        <div className='grid grid-cols-1 gap-4 mt-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonText className='w-full h-[84px]' key={index} />
          ))}
        </div>
      )}

      {analyses && analyses?.length > 0 && (
        <div className='mt-6'>
          <H6>{t('profile.patient.analyzes')}</H6>

          {analyses.length > 0 && (
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {analyses.map((analysis) => (
                <AnalysesCard key={analysis._id} analysis={analysis} locale={locale as SupportedLocales} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
