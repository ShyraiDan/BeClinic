'use client'

import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { P } from '@/components/ui/typography'

interface DeleteAnalysisModalProps {
  allowedAction: () => Promise<void>
}

export const DeleteAnalysisModal = ({ allowedAction }: DeleteAnalysisModalProps) => {
  const t = useTranslations('modals')

  return (
    <StyledModal
      triggerButton={
        <Button className='text-white' variant='icon'>
          <Trash size={16} />
        </Button>
      }>
      <DialogHeader>
        <DialogTitle>{t('deleteAnalysis.title')}</DialogTitle>
      </DialogHeader>
      <P>{t('deleteAnalysis.reallyDelete')}</P>
      <div className='flex w-full justify-between gap-4 mt-4'>
        <Button type='button' className='w-full' onClick={() => void allowedAction()}>
          {t('deleteAnalysis.delete')}
        </Button>
        <DialogClose asChild>
          <Button type='button' className='w-full' variant='reset'>
            {t('deleteAnalysis.cancel')}
          </Button>
        </DialogClose>
      </div>
    </StyledModal>
  )
}
