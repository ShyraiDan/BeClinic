'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { doctorSpecialties } from '@/mocks/shared'
import { doctorSignUpFormValuesSchema } from '@/shared/schemas'
import { DoctorSignUpFormValues } from '@/shared/types'

export const DoctorSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, control, reset } = useForm<DoctorSignUpFormValues>({
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

  const onSubmit: SubmitHandler<DoctorSignUpFormValues> = async (values) => {}

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
        name='doctorName'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label>Ім'я</Label>
            <Input type='text' placeholder='Введіть ім’я' {...field} />

            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='position'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label>Спеціальність</Label>
            <StyledSelect options={doctorSpecialties} placeholder='Оберіть опцію' {...field} />

            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='phone'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label>Номер телефону</Label>
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
        name='verificationCode'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label>Верифікаційний код</Label>
            <Input type='text' placeholder='Введіть код' {...field} />

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
