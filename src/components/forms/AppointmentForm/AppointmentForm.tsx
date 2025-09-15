'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { parseISO, getHours, getDay } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo, useRef } from 'react'
import { Controller, type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { AnalysisCard } from '@/components/AnalysisCard/AnalysisCard'
import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { SelectAnalysesModal } from '@/components/modals/SelectAnalysesModal/SelectAnalysesModal'
import { StyledDatePicker } from '@/components/StyledDatePicker/StyledDatePicker'
import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TextArea } from '@/components/ui/textarea'
import { P } from '@/components/ui/typography'
import { cn } from '@/utils/utils'
import { doctorSpecialties } from '@/mocks/shared'
import { appointmentFormValuesSchema } from '@/shared/schemas'
import { Appointment, AppointmentFormValues, SelectOption, SupportedLocales } from '@/shared/types'

// TODO: Add validation

interface AppointmentFormProps {
  appointment?: Appointment
}

export const AppointmentForm = ({ appointment }: AppointmentFormProps) => {
  const isEditMode = !!appointment?._id
  const locale = useLocale()
  const t = useTranslations('forms')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { control, reset, handleSubmit, watch, getValues, setValue } = useForm<AppointmentFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(appointmentFormValuesSchema),
    defaultValues: {
      reason: appointment?.reason ?? '',
      startTime: appointment?.startTime ?? '',
      endTime: appointment?.endTime ?? '',
      description: appointment?.description ?? '',
      analyses: appointment?.analyses ?? [],
      doctorId: appointment?.doctor._id ?? '',
      fileName: appointment?.fileName ?? '',
      startTimeHours: `${appointment?.startTime ? getHours(parseISO(appointment.startTime)) : 10}:00`
    }
  })

  const fileName = watch('fileName') ?? ''
  const startTime = watch('startTime')

  const onSubmit: SubmitHandler<AppointmentFormValues> = async (values) => {}

  const handleUploadFile = async (file: File) => {}

  const timeOptions = useMemo(() => {
    if (!startTime || getDay(startTime) === 0) return []

    const dates: SelectOption[] = []

    for (let i = getHours(startTime) < 10 ? 10 : getHours(startTime); i < 18; i++) {
      dates.push({ value: `${i}:00`, label: `${i}:00` })
    }

    return dates
  }, [startTime])

  const {
    fields: analyses,
    append: appendAnalyses,
    remove: removeAnalyses
  } = useFieldArray<AppointmentFormValues>({
    control,
    name: 'analyses'
  })

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <Controller
        name='reason'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <Label htmlFor='reason'>{t('appointmentForm.appointmentReason.label')}</Label>
            <Input
              type='text'
              id='reason'
              placeholder={t('appointmentForm.appointmentReason.placeholder')}
              {...field}
            />
            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='specialty'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <P className='font-medium mb-2'>{t('appointmentForm.appointmentSpecialization.label')}</P>
            <StyledSelect
              options={doctorSpecialties}
              placeholder={t('appointmentForm.appointmentSpecialization.placeholder')}
              {...field}
            />
            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='doctorId'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <P className='font-medium mb-2'>{t('appointmentForm.appointmentDoctor.label')}</P>
            <StyledSelect
              options={doctorSpecialties}
              disabled={!getValues('specialty')}
              placeholder={t('appointmentForm.appointmentDoctor.placeholder')}
              {...field}
            />
            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      <div className='sm:flex sm:justify-between sm:gap-4 mb-4'>
        <div className='mb-4 w-full sm:mb-0'>
          <Controller
            name='startTime'
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <>
                <P className='font-medium mb-2'>{t('appointmentForm.appointmentDate.label')}</P>
                <StyledDatePicker
                  initialDate={value}
                  onChange={onChange}
                  placeholder={t('appointmentForm.appointmentDate.placeholder')}
                />
                {fieldState.error && <ErrorText>{fieldState.error.message}</ErrorText>}
              </>
            )}
          />
        </div>
        <div className='w-full'>
          <Controller
            name='startTimeHours'
            control={control}
            render={({ field, fieldState }) => (
              <>
                <P className='font-medium mb-2'>{t('appointmentForm.appointmentTime.label')}</P>
                <StyledSelect
                  options={timeOptions}
                  placeholder={t('appointmentForm.appointmentTime.placeholder')}
                  {...field}
                />
                {fieldState.error && <ErrorText>{fieldState.error.message}</ErrorText>}
              </>
            )}
          />
        </div>
      </div>
      <div className='mt-1.5 w-full'>
        <Controller
          name='description'
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Label htmlFor='description'>{t('appointmentForm.appointmentDescription.label')}</Label>
              <TextArea
                id='description'
                placeholder={t('appointmentForm.appointmentDescription.placeholder')}
                {...field}
              />
              {fieldState.error && <ErrorText>{fieldState.error.message}</ErrorText>}
            </>
          )}
        />
      </div>

      <div className='mt-4'>
        <P className='font-medium mb-2'>{t('appointmentForm.appointmentAnalyses.label')}</P>

        <div className='grid grid-cols-1 gap-4 mt-4'>
          {analyses.map((analysis) => (
            <AnalysisCard key={analysis._id} analysis={analysis} locale={locale as SupportedLocales} />
          ))}
        </div>
      </div>

      <div className={cn(analyses.length > 0 && 'mt-4')}>
        <SelectAnalysesModal
          appendData={appendAnalyses}
          removeData={removeAnalyses}
          selectedAnalyses={analyses}
          locale={locale as SupportedLocales}
        />
      </div>

      <div className='mt-4 w-full'>
        <Controller
          name='fileName'
          control={control}
          render={({ fieldState }) => (
            <>
              <Label htmlFor='fileName'>{t('appointmentForm.appointmentFiles.label')}</Label>
              <div className='flex items-center gap-3'>
                {!fileName && (
                  <Button
                    onClick={() => {
                      fileInputRef.current?.click()
                    }}>
                    {t('appointmentForm.appointmentFiles.button')}
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
                  id='fileName'
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
