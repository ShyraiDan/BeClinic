'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { patientSignInFormValuesSchema } from '@/shared/schemas'
import { PatientSignInFormValues } from '@/shared/types'

export const PatientSignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const t = useTranslations('forms')

  const { handleSubmit, control, reset } = useForm<PatientSignInFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(patientSignInFormValuesSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<PatientSignInFormValues> = async (values) => {}

  return (
    <form className='mt-5' onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label>{t('authForm.email.label')}</Label>
            <Input type='email' placeholder='example@example.com' {...field} />

            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label>{t('authForm.password.label')}</Label>

            <div className='relative flex flex-col mt-1.5'>
              <Input type='password' placeholder={t('authForm.password.placeholder')} {...field} />

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
        {t('authForm.login')}
      </Button>
    </form>
  )
}
