'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { StyledDatePicker } from '@/components/StyledDatePicker/StyledDatePicker'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TextArea } from '@/components/ui/textarea'
import { analysisFormValuesSchema } from '@/shared/schemas'
import { Analysis, AnalysisFormValues } from '@/shared/types'
import { useTranslations } from 'next-intl'

interface AnalysisFormProps {
  analysis?: Analysis
}

export const AnalysisForm = ({ analysis }: AnalysisFormProps) => {
  const t = useTranslations('forms')

  const isEditMode = !!analysis?._id
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { control, reset, handleSubmit, watch, setValue } = useForm<AnalysisFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(analysisFormValuesSchema),
    defaultValues: {
      analysisName: analysis?.analysisName || '',
      date: analysis?.date || '',
      description: analysis?.description || '',
      fileName: analysis?.fileName || ''
    }
  })

  const onSubmit: SubmitHandler<AnalysisFormValues> = async (values) => {}

  const handleUploadFile = async (file: File) => {}

  const fileName = watch('fileName') ?? ''

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <div className='mb-4'>
        <Controller
          name='analysisName'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('analysisForm.analysisName.label')}</Label>
              <Input placeholder={t('analysisForm.analysisName.placeholder')} {...field} />
              {error && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />
      </div>

      <div className='mb-4 w-full'>
        <Label>{t('analysisForm.analysisDate.label')}</Label>
        <Controller
          name='date'
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <>
              <StyledDatePicker
                initialDate={value}
                onChange={onChange}
                placeholder={t('analysisForm.analysisDate.placeholder')}
              />
              {fieldState.error && <ErrorText>{fieldState.error.message}</ErrorText>}
            </>
          )}
        />
      </div>

      <div className='mb-4 w-full sm:mb-0'>
        <Label>{t('analysisForm.analysisDescription.label')}</Label>
        <Controller
          name='date'
          control={control}
          render={({ field, fieldState }) => (
            <>
              <TextArea placeholder={t('analysisForm.analysisDescription.placeholder')} {...field} />
              {fieldState.error && <ErrorText>{fieldState.error.message}</ErrorText>}
            </>
          )}
        />
      </div>

      <div className='mt-4 w-full'>
        <Label>{t('analysisForm.analysisFiles.label')}</Label>
        <Controller
          name='fileName'
          control={control}
          render={({ fieldState }) => (
            <>
              <div className='flex items-center gap-3'>
                {!fileName && (
                  <Button
                    onClick={() => {
                      fileInputRef.current?.click()
                    }}>
                    {t('analysisForm.analysisFiles.button')}
                  </Button>
                )}

                {fileName ? <AttachmentPreviewModal attachment={fileName} /> : null}

                {fileName && (
                  <Button
                    className='border border-solid border-red bg-transparent text-red'
                    onClick={() => {
                      setValue('fileName', '')
                    }}>
                    {t('cancel')}
                  </Button>
                )}

                {/* TODO: Refactor this void function */}
                <input
                  ref={fileInputRef}
                  type='file'
                  name='file'
                  id='file'
                  accept='image/jpg, image/jpeg, image/png, application/pdf'
                  className='hidden'
                  onChange={(e) => void handleUploadFile(e.target.files![0])}
                />
              </div>

              {fieldState.error && <ErrorText>{fieldState.error.message}</ErrorText>}
            </>
          )}
        />
      </div>

      <Button className='mt-5 w-full' type='submit'>
        {t('save')}
      </Button>
    </form>
  )
}
