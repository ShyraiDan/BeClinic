import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { EditPatientForm } from '@/components/forms/EditPatientForm/EditPatientForm'
import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Patient } from '@/shared/types'

interface EditPatientModalProps {
  patient: Patient
}

export const EditPatientModal = ({ patient }: EditPatientModalProps) => {
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
        <DialogTitle>{t('editPatient.title')}</DialogTitle>
      </DialogHeader>
      <EditPatientForm patient={patient} />
    </StyledModal>
  )
}
