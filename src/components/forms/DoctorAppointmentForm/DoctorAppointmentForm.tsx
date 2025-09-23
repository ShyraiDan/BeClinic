'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AnalysisCard } from '@/components/AnalysisCard/AnalysisCard'
import { MedicineForm } from '@/components/forms/MedicineForm/MedicineForm'
import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { PatientDetailsModal } from '@/components/modals/PatientDetailsModal/PatientDetailsModal'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { H4, P } from '@/components/ui/typography'
import { updateDoctorAppointment } from '@/lib/appointment'
import { doctorEditAppointmentFormValuesSchema } from '@/shared/schemas'
import { DoctorAppointment, DoctorEditAppointmentFormValues, SupportedLocales } from '@/shared/types'

interface DoctorAppointmentFormProps {
  appointment: DoctorAppointment
}

export const DoctorAppointmentForm = ({ appointment }: DoctorAppointmentFormProps) => {
  const t = useTranslations('page')
  const tForm = useTranslations('forms')
  const locale = useLocale()
  const { data: session } = useSession()

  const { control, handleSubmit } = useForm<DoctorEditAppointmentFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(doctorEditAppointmentFormValuesSchema),
    defaultValues: {
      diagnosis: appointment?.diagnosis ?? '',
      treatment: appointment?.treatment ?? '',
      medicine: appointment?.medicine ?? []
    }
  })

  const onSubmit: SubmitHandler<DoctorEditAppointmentFormValues> = async (values) => {
    if (!session?.user.id) return

    const result = await updateDoctorAppointment(session.user.id, appointment._id, values)

    if (result) {
      toast.success(t('notifications.visitUpdateSuccess'))

      // router.push()
    } else {
      toast.error(t('notifications.visitUpdateError'))
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <H4>{t('singleAppointmentPage.patientDetails')}</H4>
      <PatientDetailsModal patient={appointment.patient} />
      <Separator className='bg-[#D1D1D1]' />

      <H4>{t('singleAppointmentPage.appointmentReason')}</H4>
      <P>{appointment.reason || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentDetails')}</H4>
      <P>{appointment?.description || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentAnalyses')}</H4>
      <div className='flex flex-col gap-4'>
        {appointment?.analyses?.map((analysis) => (
          <AnalysisCard key={analysis._id} analysis={analysis} locale={locale as SupportedLocales} />
        ))}
        {appointment?.analyses?.length === 0 && <P>-</P>}
      </div>

      <Separator className='bg-[#D1D1D1]' />

      {appointment?.fileName && <AttachmentPreviewModal attachment={appointment.fileName} />}

      <Controller
        name='diagnosis'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='diagnosis' className='font-medium mb-2'>
              {tForm('appointmentForm.diagnosis.label')}
            </Label>
            <Input placeholder={tForm('appointmentForm.diagnosis.placeholder')} {...field} />
            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <MedicineForm control={control} />

      <Controller
        name='treatment'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='treatment' className='font-medium mb-2'>
              {tForm('appointmentForm.treatment.label')}
            </Label>
            <Input placeholder={tForm('appointmentForm.treatment.placeholder')} {...field} />
            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Button type='submit' className='mt-5 w-full'>
        {t('save')}
      </Button>
    </form>
  )
}
