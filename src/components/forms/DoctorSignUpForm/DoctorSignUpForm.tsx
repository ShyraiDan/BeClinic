'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import { Eye, EyeOff } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { handleDoctorSignUp } from '@/app/actions'
import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { P } from '@/components/ui/typography'
import { useRouter } from '@/i18n/navigation'
import { doctorSpecialties } from '@/mocks/shared'
import { doctorSignUpFormValuesSchema } from '@/shared/schemas'
import { DoctorSignUpFormValues, UserRoles } from '@/shared/types'

export const DoctorSignUpForm = () => {
  const { update } = useSession()
  const [showPassword, setShowPassword] = useState(false)
  const t = useTranslations('forms')
  const router = useRouter()

  const { handleSubmit, control } = useForm<DoctorSignUpFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(doctorSignUpFormValuesSchema),
    defaultValues: {
      email: '',
      doctorName: '',
      password: '',
      confirmPassword: '',
      verificationCode: '',
      position: '',
      phone: ''
    }
  })

  const onSubmit: SubmitHandler<DoctorSignUpFormValues> = async (values) => {
    try {
      const formData = new FormData()

      Object.entries({
        doctorName: values.doctorName,
        email: values.email,
        position: values.position,
        password: values.password,
        phone: values.phone,
        role: UserRoles.DOCTOR
      }).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const res = await handleDoctorSignUp(formData)

      if (!res.ok && res.error) {
        toast.error(t(res.error.message))
        return
      }

      await update()
      router.refresh()
    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        toast.error(t(error.message))
      }
    }
  }

  return (
    <form className='mt-5' onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='email'>{t('authForm.email.label')}</Label>
            <Input id='email' type='email' placeholder='example@example.com' {...field} />

            {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='doctorName'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='doctorName'>{t('authForm.doctorName.label')}</Label>
            <Input id='doctorName' type='text' placeholder={t('authForm.doctorName.placeholder')} {...field} />

            {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
          </div>
        )}
      />
      <Controller
        name='position'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <P className='mb-2 font-medium'>{t('authForm.position.label')}</P>
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
            <Label htmlFor='phone'>{t('authForm.phone.label')}</Label>
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
        name='verificationCode'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='verificationCode'>{t('authForm.verificationCode.label')}</Label>
            <Input
              id='verificationCode'
              type='text'
              placeholder={t('authForm.verificationCode.placeholder')}
              {...field}
            />

            {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='password'>{t('authForm.password.label')}</Label>

            <div className='relative flex flex-col mt-1.5'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder={t('authForm.password.placeholder')}
                {...field}
              />

              <span
                onClick={() => setShowPassword((state) => !state)}
                className='absolute top-2.5 right-2.5 cursor-pointer'>
                {showPassword ? (
                  <Eye size={16} className='transition-all duration-200 text-grey-700' />
                ) : (
                  <EyeOff size={16} className='transition-all duration-200 text-grey-700' />
                )}
              </span>
            </div>

            {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='confirmPassword'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='confirmPassword'>{t('authForm.confirmPassword.label')}</Label>

            <div className='relative flex flex-col mt-1.5'>
              <Input
                id='confirmPassword'
                type={showPassword ? 'text' : 'password'}
                placeholder={t('authForm.confirmPassword.placeholder')}
                {...field}
              />

              <span
                onClick={() => setShowPassword((state) => !state)}
                className='absolute top-2.5 right-2.5 cursor-pointer'>
                {showPassword ? (
                  <Eye size={16} className='transition-all duration-200 text-grey-700' />
                ) : (
                  <EyeOff size={16} className='transition-all duration-200 text-grey-700' />
                )}
              </span>
            </div>

            {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
          </div>
        )}
      />

      <Button className='w-full' type='submit'>
        {t('login')}
      </Button>
    </form>
  )
}
