'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { TextArea } from '@/components/ui/textarea'
import { P } from '@/components/ui/typography'
import { saveFileToBucket } from '@/lib/bucket'
import { updateDoctor } from '@/lib/doctors'
import { doctorSpecialties } from '@/mocks/shared'
import { BUCKET_URL } from '@/shared/constants'
import { editDoctorFormValuesSchema } from '@/shared/schemas'
import { Doctor, EditDoctorFormValues } from '@/shared/types'

interface EditDoctorFormProps {
  doctor: Doctor
  allowedAction?: () => void
}

export const EditDoctorForm = ({ doctor, allowedAction }: EditDoctorFormProps) => {
  const t = useTranslations('forms')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFileLoading, setFileLoading] = useState(false)

  const { data: session, update } = useSession()
  const { handleSubmit, control, setValue, watch, getValues } = useForm<EditDoctorFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(editDoctorFormValuesSchema),
    defaultValues: {
      email: doctor.email,
      doctorName: doctor.doctorName,
      position: doctor.position,
      phone: doctor.phone,
      avatarUrl: doctor.avatarUrl,
      description: doctor.description
    }
  })

  const onSubmit: SubmitHandler<EditDoctorFormValues> = async (values) => {
    const updatedDoctor = await updateDoctor(doctor._id, values)

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: updatedDoctor?.doctorName,
        email: updatedDoctor?.email,
        image: updatedDoctor?.avatarUrl
      }
    }

    await update(newSession)

    allowedAction?.()
  }

  const handleUploadFile = async (file: File) => {
    setFileLoading(true)

    const timestamp = Date.now()
    const extension = file.name.split('.').pop()

    const fileName = await saveFileToBucket(file, `${doctor?._id}_${timestamp}.${extension}`, 'beclinic/custom/avatars')
    setValue('avatarUrl', fileName)

    setFileLoading(false)
  }

  const avatarUrl = watch('avatarUrl') ?? ''

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
                        disabled={isFileLoading}
                        onClick={() => {
                          fileInputRef.current?.click()
                        }}>
                        {isFileLoading && <Spinner className='mr-2' />}
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
          name='doctorName'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='doctorName'>{t('editDoctorForm.doctorName.label')}</Label>
              <Input id='doctorName' type='text' placeholder={t('editDoctorForm.doctorName.placeholder')} {...field} />

              {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
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

              {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
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
                placeholder={t('authForm.position.placeholder')}
                {...field}
                localized
              />

              {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
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
              {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
            </div>
          )}
        />

        <Controller
          name='description'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor='description'>{t('editDoctorForm.description.label')}</Label>
              <TextArea id='description' placeholder={t('editDoctorForm.description.placeholder')} {...field} />

              {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
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
