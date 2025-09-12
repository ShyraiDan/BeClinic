'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import { useTranslations } from 'next-intl'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { StyledDatePicker } from '@/components/StyledDatePicker/StyledDatePicker'
import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editPatientFormValuesSchema } from '@/shared/schemas'
import { EditPatientFormValues, Patient } from '@/shared/types'

interface EditPatientFormProps {
  patient: Patient
}

const bloodOptions = [
  {
    label: 'O (I)',
    value: 'O (I)'
  },
  {
    label: 'A (II)',
    value: 'A (II)'
  },
  {
    label: 'B (III)',
    value: 'B (III)'
  },
  {
    label: 'AB (IV)',
    value: 'AB (IV)'
  }
]

const rhOptions = [
  {
    label: 'Rh +',
    value: 'Rh +'
  },
  {
    label: 'Rh -',
    value: 'Rh -'
  }
]

export const EditPatientForm = ({ patient }: EditPatientFormProps) => {
  const t = useTranslations('forms')

  const { handleSubmit, control } = useForm<EditPatientFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(editPatientFormValuesSchema),
    defaultValues: {
      email: patient.email,
      userName: patient.userName,
      dateOfBirth: patient.dateOfBirth,
      phoneNumber: patient.phoneNumber,
      bloodType: patient.bloodType,
      diabetes: patient.diabetes,
      rhFactor: patient.rhFactor,
      bloodTransfusion: patient.bloodTransfusion,
      intoleranceToMedicines: patient.intoleranceToMedicines,
      infectiousDiseases: patient.infectiousDiseases,
      surgicalInterventions: patient.surgicalInterventions,
      allergies: patient.allergies
    }
  })

  const onSubmit: SubmitHandler<EditPatientFormValues> = async (values) => {}

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <div className='mt-4 max-h-[500px] overflow-y-auto'>
        <Controller
          name='userName'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.patientName.label')}</Label>
              <Input type='text' placeholder={t('editPatientForm.patientName.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='email'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.email.label')}</Label>
              <Input type='email' placeholder='example@example.com' {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='dateOfBirth'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.dateOfBirth.label')}</Label>
              <StyledDatePicker placeholder={t('editPatientForm.dateOfBirth.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='phoneNumber'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.dateOfBirth.label')}</Label>
              <InputMask
                component={Input}
                mask='+38 (0__) ___-__-__'
                placeholder='+38 (0__) ___-__-__'
                replacement='_'
                {...field}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='bloodType'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.bloodType.label')}</Label>
              <StyledSelect
                options={bloodOptions}
                placeholder={t('editPatientForm.bloodType.placeholder')}
                {...field}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='diabetes'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.diabetes.label')}</Label>
              <Input type='text' placeholder={t('editPatientForm.diabetes.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='rhFactor'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.rhFactor.label')}</Label>
              <StyledSelect options={rhOptions} placeholder={t('editPatientForm.rhFactor.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='bloodTransfusion'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.bloodTransfusion.label')}</Label>
              <Input type='text' placeholder={t('editPatientForm.bloodTransfusion.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='intoleranceToMedicines'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.intoleranceToMedicines.label')}</Label>
              <Input type='text' placeholder={t('editPatientForm.intoleranceToMedicines.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='infectiousDiseases'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.infectiousDiseases.label')}</Label>
              <Input type='text' placeholder={t('editPatientForm.infectiousDiseases.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='surgicalInterventions'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.surgicalInterventions.label')}</Label>
              <Input type='text' placeholder={t('editPatientForm.surgicalInterventions.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='allergies'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('editPatientForm.allergies.label')}</Label>
              <Input type='text' placeholder={t('editPatientForm.allergies.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />
      </div>
      <Button className='mt-5 w-full' type='submit'>
        {t('save')}
      </Button>
    </form>
  )
}
