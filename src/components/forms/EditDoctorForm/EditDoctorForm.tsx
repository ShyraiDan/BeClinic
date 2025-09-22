'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import { useTranslations } from 'next-intl'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { P } from '@/components/ui/typography'
import { doctorSpecialties } from '@/mocks/shared'
import { editDoctorFormValuesSchema } from '@/shared/schemas'
import { Doctor, EditDoctorFormValues } from '@/shared/types'

interface EditDoctorFormProps {
  doctor: Doctor
}

export const EditDoctorForm = ({ doctor }: EditDoctorFormProps) => {
  const t = useTranslations('forms')

  const { handleSubmit, control } = useForm<EditDoctorFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(editDoctorFormValuesSchema),
    defaultValues: {
      email: doctor.email,
      doctorName: doctor.doctorName,
      position: doctor.position,
      phone: doctor.phone,
      avatarUrl: doctor.avatarUrl
    }
  })

  const onSubmit: SubmitHandler<EditDoctorFormValues> = async (values) => {}

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <div className='mt-4 max-h-[500px] overflow-y-auto'>
        <Controller
          name='doctorName'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='doctorName'>{t('editDoctorForm.doctorName.label')}</Label>
              <Input id='doctorName' type='text' placeholder={t('editDoctorForm.doctorName.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='email'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='email'>{t('editDoctorForm.email.label')}</Label>
              <Input id='email' type='email' placeholder='example@example.com' {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='position'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <P className='mb-2 font-medium'>{t('editDoctorForm.position.label')}</P>
              <StyledSelect
                options={doctorSpecialties}
                placeholder={t('editDoctorForm.position.placeholder')}
                {...field}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='phone'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='phone'>{t('editDoctorForm.phone.label')}</Label>
              <InputMask
                id='phone'
                type='tel'
                component={Input}
                mask='___ (___) ___-__-__'
                placeholder='+38 (0__) ___-__-__'
                replacement='_'
                {...field}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Button className='w-full' type='submit'>
          {t('save')}
        </Button>
      </div>
    </form>
  )
}
