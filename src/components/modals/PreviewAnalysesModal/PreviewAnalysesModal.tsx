import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useTranslations } from 'next-intl'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { H4, H6, P } from '@/components/ui/typography'
import { Analysis, SupportedLocales } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

import { AttachmentPreviewModal } from '../AttachmentPreviewModal/AttachmentPreviewModal'

interface PreviewAnalysisModalProps {
  analysis: Analysis
  locale: SupportedLocales
}

export const PreviewAnalysesModal = ({ analysis, locale }: PreviewAnalysisModalProps) => {
  const t = useTranslations('modals')
  const dateLocale = dateLocaleMap[locale] ?? enUS

  return (
    <StyledModal
      triggerButton={
        <div key={analysis._id} className='flex inset-shadow-profile bg-white'>
          <div className='w-2 bg-blue-100' />
          <div className='py-4 pr-4 pl-3 flex flex-col'>
            <H6>{analysis.analysisName}</H6>
            <P className='capitalize'>{format(analysis.date, 'MMM dd, yyyy', { locale: dateLocale })}</P>
          </div>
        </div>
      }>
      <DialogHeader>
        <DialogTitle className='text-2xl'>{analysis.analysisName}</DialogTitle>
      </DialogHeader>
      <div className='h-[450px] overflow-y-auto'>
        <H4 className='mb-2'>{t('previewAnalyses.date')}</H4>
        <P>{analysis.date ? format(analysis.date, 'dd.MM.yyyy') : '-'}</P>
        <Separator className='bg-grey-100' />

        <H4 className='mb-2'>{t('previewAnalyses.description')}</H4>
        <P>{analysis.description || '-'}</P>

        {analysis.fileName && (
          <>
            <Separator className='bg-grey-100' />
            <H4 className='mb-2'>{t('previewAnalyses.attachments')}</H4>
            <AttachmentPreviewModal attachment={analysis.fileName} />
          </>
        )}
      </div>
    </StyledModal>
  )
}
