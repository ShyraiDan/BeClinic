'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Pencil } from 'lucide-react'
import { notFound, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useDeleteAnalysisMutation, useGetSingleAnalysisQuery } from '@/client/analysis'
import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { DeleteAnalysisModal } from '@/components/modals/DeleteAnalysisModal/DeleteAnalysisModal'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H2, H4, P } from '@/components/ui/typography'
import { useRouter } from '@/i18n/navigation'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

const SingleAnalysisPage = () => {
  const t = useTranslations('page')
  const { data: session } = useSession()
  const params = useParams<{ locale: string; analysisId: string }>()
  const { locale, analysisId } = params
  const router = useRouter()

  const { data: analyses, isLoading } = useGetSingleAnalysisQuery(session?.user.id || '', analysisId)
  const { mutateAsync: deleteAnalysis } = useDeleteAnalysisMutation(analysisId)
  const dateLocale = dateLocaleMap[locale] ?? enUS

  if (!analyses && !isLoading) {
    notFound()
  }

  const handleDeleteAnalysis = async () => {
    const res = await deleteAnalysis({ analysisId })

    if (res) {
      toast.success('singleAnalysisPage.notifications.deleteAnalysisSuccess')
      router.push(`/patient/${session?.user.id}?tab=analyses`)
    } else {
      toast.error('singleAnalysisPage.notifications.deleteAnalysisError')
    }
  }

  return (
    <>
      <PageHeading>
        {isLoading ? (
          <SkeletonText className='h-10 mb-2.5 mt-5.5 w-[270px] bg-white opacity-10' />
        ) : (
          <H2 className='text-white mt-4 mb-1'>{analyses?.analysisName}</H2>
        )}

        <div className='flex items-center w-full justify-between'>
          {isLoading || !analyses ? (
            <SkeletonText className='h-4 mb-1 w-[240px] bg-white opacity-10' />
          ) : (
            <P className='text-white'>
              {t('singleAnalysisPage.analysisDate')}{' '}
              <span className='capitalize'>{format(analyses.date, 'MMM dd, yyyy', { locale: dateLocale })}</span>
            </P>
          )}

          <div className='flex gap-4 text-white'>
            <StyledLinkButton variant='icon' href={`/analyses/${analyses?._id}/edit`}>
              <Pencil size={16} />
            </StyledLinkButton>
            <DeleteAnalysisModal allowedAction={handleDeleteAnalysis} />
          </div>
        </div>
      </PageHeading>
      <Container className='min-h-[40vh]'>
        <H4 className='mb-2'>{t('singleAnalysisPage.analysisDetails')}</H4>

        {isLoading ? <SkeletonText className='h-4 mb-1 w-[240px]' /> : <P>{analyses?.description || '-'}</P>}

        <Separator className='bg-grey-100' />
        {analyses?.fileName && <AttachmentPreviewModal attachment={analyses.fileName} />}
      </Container>
    </>
  )
}

export default SingleAnalysisPage
