import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { H6, P } from '@/components/ui/typography'
import { Analysis, PatientAppointmentFormValues, SupportedLocales } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

import type { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'

interface AnalysesCardProps {
  analysis: Analysis
  onSelect: () => void
  selected: boolean
  locale: SupportedLocales
}

const AnalysesCard = ({ analysis, onSelect, selected, locale }: AnalysesCardProps) => {
  const dateLocale = dateLocaleMap[locale] ?? enUS

  return (
    <div className='flex inset-shadow-profile bg-white relative cursor-pointer' onClick={onSelect}>
      <div className='w-2 bg-blue-100' />
      <div className='py-4 pr-4 pl-3 flex flex-col'>
        <H6>{analysis.analysisName}</H6>
        <P className='capitalize'>{format(analysis.date, 'MMM dd, yyyy', { locale: dateLocale })}</P>
      </div>

      {selected && (
        <div className='absolute top-0 right-5 w-5 h-5 bg-green-600 flex items-center justify-center shadow-md'>
          <Check className='text-white' />
        </div>
      )}
    </div>
  )
}

interface SelectAnalysesModalProps {
  analyses: Analysis[]
  selectedAnalyses: Analysis[]
  appendData: UseFieldArrayAppend<PatientAppointmentFormValues, 'analyses'>
  removeData: UseFieldArrayRemove
  locale: SupportedLocales
}

export const SelectAnalysesModal = ({
  analyses,
  appendData,
  selectedAnalyses,
  locale,
  removeData
}: SelectAnalysesModalProps) => {
  const t = useTranslations('forms')

  const handleSelectItem = (analyses: Analysis) => {
    const analysesIndex = selectedAnalyses.findIndex((item) => item._id === analyses._id)

    if (analysesIndex !== -1) {
      removeData(analysesIndex)
    } else {
      appendData(analyses)
    }
  }

  return (
    <StyledModal triggerButton={<Button>{t('appointmentForm.appointmentAnalyses.button')}</Button>}>
      <DialogHeader>
        <DialogTitle>{t('appointmentForm.appointmentAnalyses.label')}</DialogTitle>
      </DialogHeader>

      {analyses.length === 0 ? (
        <P>{t('appointmentForm.appointmentAnalyses.noAnalyses')}</P>
      ) : (
        <div className='grid grid-cols-1 gap-4 mt-4 max-h-[500px] overflow-y-auto'>
          {analyses.map((analysis) => (
            <AnalysesCard
              key={analysis._id}
              analysis={analysis}
              onSelect={() => handleSelectItem(analysis)}
              selected={selectedAnalyses.some((item) => item._id === analysis._id)}
              locale={locale}
            />
          ))}
        </div>
      )}

      <DialogFooter>
        <DialogClose asChild>
          <Button className='w-full h-10' type='submit'>
            {t('save')}
          </Button>
        </DialogClose>
      </DialogFooter>
    </StyledModal>
  )
}
