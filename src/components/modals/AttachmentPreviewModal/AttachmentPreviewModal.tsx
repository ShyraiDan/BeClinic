'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { BUCKET_URL } from '@/shared/constants'

interface AttachmentPreviewModalProps {
  attachment: string
}

export const AttachmentPreviewModal = ({ attachment }: AttachmentPreviewModalProps) => {
  const t = useTranslations('forms')

  const fileType = useMemo(() => attachment.split('.').pop(), [attachment])

  return (
    <StyledModal triggerButton={<Button>{t('appointmentForm.appointmentFiles.button')}</Button>}>
      {fileType && ['jpg', 'jpeg', 'png'].includes(fileType) && (
        <Image src={`${BUCKET_URL}/custom/files/${attachment}`} alt='' width={500} height={500} unoptimized />
      )}

      {fileType?.includes('pdf') && (
        <div className='w-full h-full flex items-center justify-center max-h-[800px] max-w-[900px]'>
          <iframe
            src={`${BUCKET_URL}/custom/files/${attachment}`}
            className='h-[300px] w-[250px] sm:h-[450px] sm:w-[400px] md:h-[650px] md:w-[550px] lg:h-[750px] lg:w-[650px]'
          />
        </div>
      )}
    </StyledModal>
  )
}
