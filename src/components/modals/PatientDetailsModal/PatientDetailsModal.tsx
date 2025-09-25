import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { H4, P } from '@/components/ui/typography'
import { Patient } from '@/shared/types'

interface PatientDetailsModalProps {
  patient: Patient
}
export const PatientDetailsModal = ({ patient }: PatientDetailsModalProps) => {
  const t = useTranslations('modals')

  return (
    <StyledModal triggerButton={<Button className='mt-4'>{t('patientDetails.buttonTitle')}</Button>}>
      <DialogHeader>
        <DialogTitle>{patient.userName}</DialogTitle>
      </DialogHeader>
      <H4 className='mb-2'>Email</H4>
      <P>{patient.email}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.dateOfBirth')}</H4>
      <P>{patient.dateOfBirth ? format(patient.dateOfBirth, 'dd.MM.yyyy') : '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.phoneNumber')}</H4>
      <P>{patient.phoneNumber}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.bloodType')}</H4>
      <P>{patient.bloodType}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.diabetes')}</H4>
      <P>{patient.diabetes}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.rhFactor')}</H4>
      <P>{patient.rhFactor}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.bloodTransfusion')}</H4>
      <P>{patient.bloodTransfusion}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.intoleranceToMedicines')}</H4>
      <P>{patient.intoleranceToMedicines}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.infectiousDiseases')}</H4>
      <P>{patient.infectiousDiseases}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.surgicalInterventions')}</H4>
      <P>{patient.surgicalInterventions}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('patientDetails.allergies')}</H4>
      <P>{patient.allergies}</P>
      <Separator className='bg-[#D1D1D1]' />
    </StyledModal>
  )
}
