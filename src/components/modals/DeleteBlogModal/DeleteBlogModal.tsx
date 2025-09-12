'use client'

import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { P } from '@/components/ui/typography'

interface DeleteBlogModalProps {
  allowedAction: () => void
}

export const DeleteBlogModal = ({ allowedAction }: DeleteBlogModalProps) => {
  const t = useTranslations('modals')

  return (
    <StyledModal
      triggerButton={
        <Button className='text-white' variant='icon' onClick={() => allowedAction()}>
          <Trash size={16} />
        </Button>
      }>
      <DialogHeader>
        <DialogTitle>{t('deleteBlog.title')}</DialogTitle>
      </DialogHeader>
      <P>{t('deleteBlog.reallyDelete')}</P>
      <div className='flex w-full justify-between gap-4 mt-4'>
        <Button className='w-full' onClick={() => allowedAction()}>
          {t('deleteBlog.delete')}
        </Button>
        <DialogClose asChild>
          <Button className='w-full' variant='outline-blue' onClick={() => allowedAction()}>
            {t('deleteBlog.cancel')}
          </Button>
        </DialogClose>
      </div>
    </StyledModal>
  )
}
