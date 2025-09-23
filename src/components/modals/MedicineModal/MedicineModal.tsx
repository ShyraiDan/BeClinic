/**
 * @deprecated Temporary unused
 */

import { useTranslations } from 'next-intl'

import { MedicineForm } from '@/components/forms/MedicineForm/MedicineForm'
import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DoctorEditAppointmentFormValues, Patient } from '@/shared/types'

import type { Control } from 'react-hook-form'

interface PatientDetailsModalProps {
  control: Control<DoctorEditAppointmentFormValues>
  patient: Patient
}
export const MedicineModal = ({ patient, control }: PatientDetailsModalProps) => {
  const t = useTranslations('modals')

  return (
    <StyledModal triggerButton={<Button>Додати препарат</Button>}>
      <DialogHeader>
        <DialogTitle>{patient.userName}</DialogTitle>
      </DialogHeader>
      <MedicineForm control={control} />
    </StyledModal>
  )
}
