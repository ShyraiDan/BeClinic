import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { EditDoctorForm } from '@/components/forms/EditDoctorForm/EditDoctorForm'
import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Doctor } from '@/shared/types'

interface EditDoctorModalProps {
  doctor: Doctor
}

export const EditDoctorModal = ({ doctor }: EditDoctorModalProps) => {
  const t = useTranslations('modals')

  return (
    <StyledModal
      triggerButton={
        <Button
          variant='icon'
          className='absolute top-[-20px] right-0 bg-transparent lg:top-[-25px] p-0 m-0 w-4 h-4 hover:bg-transparent hover:text-blue-200'>
          <Pencil size={16} />
        </Button>
      }>
      <DialogHeader>
        <DialogTitle>{t('editDoctor.title')}</DialogTitle>
      </DialogHeader>
      <EditDoctorForm doctor={doctor} />
    </StyledModal>
  )
}
