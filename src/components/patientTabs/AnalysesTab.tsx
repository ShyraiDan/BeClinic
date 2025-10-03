'use client'

import { Plus } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { useGetPaginatedAnalysisQuery } from '@/client/analysis'
import { AnalysisCard } from '@/components/AnalysisCard/AnalysisCard'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { P, H6 } from '@/components/ui/typography'
import { SupportedLocales } from '@/shared/types'

export const AnalysesTab = () => {
  const { data: session } = useSession()

  const params = useParams<Record<string, string | undefined>>()
  const searchParams = useSearchParams()
  const { locale } = params
  const pageNumber = parseInt(searchParams.get('page') || '1')
  const pageSizeNumber = parseInt(searchParams.get('pageSize') || '10')

  const { data: analysesData, isLoading } = useGetPaginatedAnalysisQuery(
    session?.user?.id || '',
    pageNumber,
    pageSizeNumber
  )

  const t = useTranslations('page')

  return (
    <>
      <div className='mt-6 flex justify-between'>
        <H6>{t('profile.patient.addAnalyses')}</H6>
        <StyledLinkButton href='/analyses/add' variant='icon' className='p-2.5 bg-blue-300'>
          <Plus fill='#fff' size={16} />
        </StyledLinkButton>
      </div>

      {(!analysesData || analysesData.data?.length === 0) && !isLoading && <P>{t('profile.patient.noAnalyses')}</P>}

      {isLoading && (
        <div className='grid grid-cols-1 gap-4 mt-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonText className='w-full h-[84px]' key={index} />
          ))}
        </div>
      )}

      {analysesData && analysesData.data?.length > 0 && (
        <div className='mt-6'>
          <H6>{t('profile.patient.analyses')}</H6>

          <div className='grid grid-cols-1 gap-4 mt-4'>
            {analysesData.data.map((analysis) => (
              <AnalysisCard key={analysis._id} analysis={analysis} locale={locale as SupportedLocales} />
            ))}
          </div>

          <div className='mt-10'>
            <PaginationWithLinks page={pageNumber} pageSize={pageSizeNumber} totalCount={analysesData.total} />
          </div>
        </div>
      )}
    </>
  )
}
