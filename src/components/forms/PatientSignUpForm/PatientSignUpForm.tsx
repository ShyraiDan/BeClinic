'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { patientSignUpFormValuesSchema } from '@/shared/schemas'
import { PatientSignUpFormValues } from '@/shared/types'

export const PatientSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const t = useTranslations('forms')

  const { handleSubmit, control, reset } = useForm<PatientSignUpFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(patientSignUpFormValuesSchema),
    defaultValues: {
      email: '',
      userName: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit: SubmitHandler<PatientSignUpFormValues> = async (values) => {}

  return (
    <form className='mt-5' onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='email'>{t('authForm.email.label')}</Label>
            <Input id='email' type='email' placeholder='example@example.com' {...field} />

            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='userName'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='userName'>{t('authForm.patientName.label')}</Label>
            <Input id='userName' type='text' placeholder={t('authForm.patientName.placeholder')} {...field} />

            {error?.message && <ErrorText>{error.message}</ErrorText>}
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
                  <Eye
                    size={16}
                    className='transition-all duration-200 text-grey-700 dark:text-white-100 dark:hover:text-purple-100'
                  />
                ) : (
                  <EyeOff
                    size={16}
                    className='transition-all duration-200 text-grey-700 dark:text-white-100 dark:hover:text-purple-100'
                  />
                )}
              </span>
            </div>

            {error?.message && <ErrorText>{error.message}</ErrorText>}
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
                  <Eye
                    size={16}
                    className='transition-all duration-200 text-grey-700 dark:text-white-100 dark:hover:text-purple-100'
                  />
                ) : (
                  <EyeOff
                    size={16}
                    className='transition-all duration-200 text-grey-700 dark:text-white-100 dark:hover:text-purple-100'
                  />
                )}
              </span>
            </div>

            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Button className='w-full' type='submit'>
        {t('login')}
      </Button>
    </form>
  )
}
