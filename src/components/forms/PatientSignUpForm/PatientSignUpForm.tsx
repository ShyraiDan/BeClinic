'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { patientSignUpFormValuesSchema } from '@/shared/schemas'
import { PatientSignUpFormValues } from '@/shared/types'

export const PatientSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false)

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
            <Label>Електронна пошта</Label>
            <Input type='email' placeholder='example@example.com' {...field} />

            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='userName'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label>Ім'я</Label>
            <Input type='text' placeholder="Введіть ім'я" {...field} />

            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label>Пароль</Label>

            <div className='relative flex flex-col mt-1.5'>
              <Input type='password' placeholder='Пароль' {...field} />

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
            <Label>Підтвердіть пароль</Label>

            <div className='relative flex flex-col mt-1.5'>
              <Input type='password' placeholder='Підтвердіть пароль' {...field} />

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
    </form>
  )
}
