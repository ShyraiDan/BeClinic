'use client'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import { BUCKET_URL } from '@/shared/constants'

interface AttachmentPreviewModalProps {
  attachment: string
}

export const AttachmentPreviewModal = ({ attachment }: AttachmentPreviewModalProps) => {
  const t = useTranslations('forms')

  const fileType = useMemo(() => attachment.split('.').pop(), [attachment])

  return (
    <StyledModal
      contentClassName='h-[calc(100%-60px)] w-full !max-w-[calc(100%-48px)] lg:max-w-[60%] lg:w-[60%]'
      aria-describedby={undefined}
      triggerButton={<Button type='button'>{t('appointmentForm.appointmentFiles.viewButton')}</Button>}>
      <VisuallyHidden>
        <DialogTitle>{t('appointmentForm.appointmentFiles.previewAttachment')}</DialogTitle>
      </VisuallyHidden>

      {fileType && ['jpg', 'jpeg', 'png'].includes(fileType) && (
        <div className='w-full h-full flex justify-center my-4'>
          <Image
            src={`${BUCKET_URL}/custom/files/${attachment}`}
            className='h-[calc(100%-16px)] w-[100%] max-w-[750px] max-h-[750px] object-contain'
            alt=''
            width={500}
            height={500}
            unoptimized
          />
        </div>
      )}

      {fileType?.includes('pdf') && (
        <div className='w-full h-full flex justify-center my-4'>
          <iframe
            src={`${BUCKET_URL}/custom/files/${attachment}`}
            className='h-[calc(100%-16px)] w-[100%] lg:h-[750px] lg:max-w-[calc(1200px-32px)]'
          />
        </div>
      )}
    </StyledModal>
  )
}
