import { format, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Pencil } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H2, H4, P } from '@/components/ui/typography'
import { mockedAnalyses } from '@/mocks/mockedAnalyses'
import { SupportedLocales } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

interface SingleAnalysisPageProps {
  params: Promise<{ appointmentId: string; locale: SupportedLocales }>
}

const SingleAnalysisPage = async ({ params }: SingleAnalysisPageProps) => {
  const t = await getTranslations('page')
  const { locale } = await params
  const analyses = mockedAnalyses[0]
  const isLoading = true

  const dateLocale = dateLocaleMap[locale] ?? enUS

  return (
    <>
      <PageHeading title=''>
        {isLoading ? (
          <SkeletonText className='h-10 mb-2.5 mt-5.5 w-[270px] bg-white opacity-10' />
        ) : (
          <H2 className='text-white mt-4 mb-1'>{analyses?.analysisName}</H2>
        )}

        <div className='flex items-center w-full justify-between'>
          {isLoading ? (
            <SkeletonText className='h-4 mb-1 w-[240px] bg-white opacity-10' />
          ) : (
            <P className='text-white'>
              {t('singleAnalysisPage.analysisDate')}{' '}
              <span className='capitalize'>
                {format(parseISO(analyses?.date), 'MMM dd, yyyy HH:mm', { locale: dateLocale })}
              </span>
            </P>
          )}

          <div className='flex gap-4 text-white'>
            <StyledLinkButton variant='icon' href={`/analyses/${analyses._id}/edit`}>
              <Pencil size={16} />
            </StyledLinkButton>
          </div>
        </div>
      </PageHeading>
      <Container className='min-h-[40vh]'>
        <H4 className='mb-2'>{t('singleAnalysisPage.analysisDetails')}</H4>

        {isLoading ? <SkeletonText className='h-4 mb-1 w-[240px]' /> : <P>{analyses?.description || '-'}</P>}

        <Separator className='bg-[#D1D1D1]' />
        {analyses?.fileName && <AttachmentPreviewModal attachment={analyses.fileName} />}
      </Container>
    </>
  )
}

export default SingleAnalysisPage
