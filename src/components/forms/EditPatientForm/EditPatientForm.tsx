'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { StyledDatePicker } from '@/components/StyledDatePicker/StyledDatePicker'
import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { P } from '@/components/ui/typography'
import { saveFileToBucket } from '@/lib/bucket'
import { updatePatient } from '@/lib/patient'
import { BUCKET_URL } from '@/shared/constants'
import { editPatientFormValuesSchema } from '@/shared/schemas'
import { EditPatientFormValues, Patient } from '@/shared/types'

interface EditPatientFormProps {
  patient: Patient
  allowedAction?: () => void
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

export const EditPatientForm = ({ patient, allowedAction }: EditPatientFormProps) => {
  const t = useTranslations('forms')
  const { data: session, update } = useSession()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFileLoading, setFileLoading] = useState(false)

  const { handleSubmit, control, watch, getValues, setValue } = useForm<EditPatientFormValues>({
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
      allergies: patient.allergies,
      avatarUrl: patient.avatarUrl
    }
  })

  const onSubmit: SubmitHandler<EditPatientFormValues> = async (values) => {
    const updatedPatient = await updatePatient(patient._id, values)

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: updatedPatient?.userName,
        email: updatedPatient?.email,
        image: updatedPatient?.avatarUrl
      }
    }

    await update(newSession)

    allowedAction?.()
  }

  const avatarUrl = watch('avatarUrl') ?? ''

  const handleUploadFile = async (file: File) => {
    setFileLoading(true)

    const timestamp = Date.now()
    const extension = file.name.split('.').pop()

    const fileName = await saveFileToBucket(
      file,
      `${patient?._id}_${timestamp}.${extension}`,
      'beclinic/custom/avatars'
    )
    setValue('avatarUrl', fileName)

    setFileLoading(false)
  }

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <div className='mt-4 max-h-[500px] overflow-y-auto'>
        <div className='mt-4 w-full'>
          <Controller
            name='avatarUrl'
            control={control}
            render={({ fieldState: { error } }) => (
              <>
                <Label htmlFor='fileName'>{t('editPatientForm.avatarUrl.label')}</Label>

                <div className='flex items-center justify-center w-[80px] h-[80px] bg-blue-100 rounded-full'>
                  {watch('avatarUrl') ? (
                    <Image
                      alt='User avatar'
                      width={80}
                      height={80}
                      className='w-full h-full rounded-full'
                      src={`${BUCKET_URL}/custom/avatars/${getValues('avatarUrl')}`}
                    />
                  ) : (
                    <User size={24} className='text-white' />
                  )}
                </div>

                <div className='flex items-center gap-3 mt-2 mb-4'>
                  {!avatarUrl && (
                    <Button
                      type='button'
                      disabled={isFileLoading}
                      onClick={() => {
                        fileInputRef.current?.click()
                      }}>
                      {isFileLoading && <Spinner className='mr-2' />}
                      {t('editPatientForm.avatarUrl.addAvatar')}
                    </Button>
                  )}

                  {avatarUrl && (
                    <>
                      <Button
                        type='button'
                        onClick={() => {
                          fileInputRef.current?.click()
                        }}>
                        {t('edit')}
                      </Button>
                      <Button
                        type='button'
                        variant='reset'
                        onClick={() => {
                          setValue('avatarUrl', '')
                        }}>
                        {t('cancel')}
                      </Button>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type='file'
                    name='file'
                    id='fileName'
                    accept='image/jpg, image/jpeg, image/png'
                    className='hidden'
                    onChange={(e) => void handleUploadFile(e.target.files![0])}
                  />
                </div>

                {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
              </>
            )}
          />
        </div>

        <Controller
          name='userName'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='userName'>{t('editPatientForm.patientName.label')}</Label>
              <Input id='userName' type='text' placeholder={t('editPatientForm.patientName.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='email'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='email'>{t('editPatientForm.email.label')}</Label>
              <Input id='email' type='email' placeholder='example@example.com' {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='dateOfBirth'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className='mb-4'>
              <P className='mb-2 font-medium'>{t('editPatientForm.dateOfBirth.label')}</P>
              <StyledDatePicker
                initialDate={value}
                hintFormat='dd/MM/yyyy'
                placeholder={t('editPatientForm.dateOfBirth.placeholder')}
                errorText={(error?.message && <ErrorText>{error.message}</ErrorText>) || null}
                onChange={onChange}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='phoneNumber'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='phoneNumber'>{t('editPatientForm.dateOfBirth.label')}</Label>
              <InputMask
                id='phoneNumber'
                type='tel'
                component={Input}
                mask='___ (___) ___-__-__'
                placeholder='+38 (___) ___-__-__'
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
              <P className='mb-2 font-medium'>{t('editPatientForm.bloodType.label')}</P>
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
              <Label htmlFor='diabetes'>{t('editPatientForm.diabetes.label')}</Label>
              <Input id='diabetes' type='text' placeholder={t('editPatientForm.diabetes.placeholder')} {...field} />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='rhFactor'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <P className='mb-2 font-medium'>{t('editPatientForm.rhFactor.label')}</P>
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
              <Label htmlFor='bloodTransfusion'>{t('editPatientForm.bloodTransfusion.label')}</Label>
              <Input
                id='bloodTransfusion'
                type='text'
                placeholder={t('editPatientForm.bloodTransfusion.placeholder')}
                {...field}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='intoleranceToMedicines'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='intoleranceToMedicines'>{t('editPatientForm.intoleranceToMedicines.label')}</Label>
              <Input
                id='intoleranceToMedicines'
                type='text'
                placeholder={t('editPatientForm.intoleranceToMedicines.placeholder')}
                {...field}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='infectiousDiseases'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='infectiousDiseases'>{t('editPatientForm.infectiousDiseases.label')}</Label>
              <Input
                id='infectiousDiseases'
                type='text'
                placeholder={t('editPatientForm.infectiousDiseases.placeholder')}
                {...field}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='surgicalInterventions'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='surgicalInterventions'>{t('editPatientForm.surgicalInterventions.label')}</Label>
              <Input
                id='surgicalInterventions'
                type='text'
                placeholder={t('editPatientForm.surgicalInterventions.placeholder')}
                {...field}
              />

              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='allergies'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='allergies'>{t('editPatientForm.allergies.label')}</Label>
              <Input id='allergies' type='text' placeholder={t('editPatientForm.allergies.placeholder')} {...field} />

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
