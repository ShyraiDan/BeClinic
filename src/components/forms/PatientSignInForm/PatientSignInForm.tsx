'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { handleCredentialLogin } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from '@/i18n/navigation'
import { patientSignInFormValuesSchema } from '@/shared/schemas'
import { PatientSignInFormValues, UserRoles } from '@/shared/types'

export const PatientSignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const t = useTranslations('forms')

  const router = useRouter()

  const { handleSubmit, control } = useForm<PatientSignInFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(patientSignInFormValuesSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<PatientSignInFormValues> = async (values) => {
    try {
      const formData = new FormData()

      Object.entries({
        email: values.email,
        password: values.password,
        role: UserRoles.PATIENT
      }).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await handleCredentialLogin(formData)

      if (!response.ok && response.error) {
        toast.error(t(response.error.message))
        return
      }

      if (response.ok) {
        router.refresh()
      }
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

      <Button className='w-full' type='submit'>
        {t('login')}
      </Button>
    </form>
  )
}
