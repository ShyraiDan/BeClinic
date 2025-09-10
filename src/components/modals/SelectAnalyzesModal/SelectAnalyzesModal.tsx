import { format, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { H6, P } from '@/components/ui/typography'
import { mockedAnalyzes } from '@/mocks/mockedAnalyzes'
import { Analysis, AppointmentFormValues, SupportedLocales } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

import type { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'

interface CustomAnalyzesCardProps {
  analysis: Analysis
  onSelect: () => void
  selected: boolean
  locale: SupportedLocales
}

const AnalysesCard = ({ analysis, onSelect, selected, locale }: CustomAnalyzesCardProps) => {
  const dateLocale = dateLocaleMap[locale] ?? enUS

  return (
    <div className='flex shadow-custom-right bg-white relative cursor-pointer' onClick={onSelect}>
      <div className='w-2 bg-blue-100' />
      <div className='py-4 pr-4 pl-3 flex flex-col'>
        <H6>{analysis.analysisName}</H6>
        <P className='capitalize'>{format(parseISO(analysis.date), 'MMM dd, yyyy', { locale: dateLocale })}</P>
      </div>

      {selected && (
        <div className='absolute top-0 right-5 w-5 h-5 bg-green-600 flex items-center justify-center shadow-md'>
          <Check className='fill-white' />
        </div>
      )}
    </div>
  )
}

interface SelectAnalyzesModalProps {
  selectedAnalyzes: Analysis[]
  appendData: UseFieldArrayAppend<AppointmentFormValues, 'analyzes'>
  removeData: UseFieldArrayRemove
  locale: SupportedLocales
}

export const SelectAnalyzesModal = ({ appendData, selectedAnalyzes, locale, removeData }: SelectAnalyzesModalProps) => {
  const t = useTranslations('forms')

  const handleSelectItem = (analyses: Analysis) => {
    const analyzesIndex = selectedAnalyzes.findIndex((item) => item._id === analyses._id)

    if (analyzesIndex !== -1) {
      removeData(analyzesIndex)
    } else {
      appendData(analyses)
    }
  }

  return (
    <StyledModal triggerButton={<Button>{t('appointmentForm.appointmentAnalyzes.button')}</Button>}>
      <>
        <DialogHeader>
          <DialogTitle>{t('appointmentForm.appointmentAnalyzes.label')}</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-1 gap-4 mt-4 max-h-[500px] overflow-y-auto'>
          {[...mockedAnalyzes, ...mockedAnalyzes].map((analysis) => (
            <AnalysesCard
              key={analysis._id}
              analysis={analysis}
              onSelect={() => handleSelectItem(analysis)}
              selected={selectedAnalyzes.some((item) => item._id === analysis._id)}
              locale={locale}
            />
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit'>{t('save')}</Button>
          </DialogClose>
        </DialogFooter>
      </>
    </StyledModal>
  )
}
