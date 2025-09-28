'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { getHours, getDay, addHours, formatISO } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo, useRef, useState } from 'react'
import { Controller, type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useGetAnalysisQuery } from '@/client/analysis'
import { useCreateAppointmentMutation, useUpdatePatientAppointmentMutation } from '@/client/appointment'
import { useSearchDoctorQuery } from '@/client/doctor'
import { AnalysisCard } from '@/components/AnalysisCard/AnalysisCard'
import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { SelectAnalysesModal } from '@/components/modals/SelectAnalysesModal/SelectAnalysesModal'
import { StyledDatePicker } from '@/components/StyledDatePicker/StyledDatePicker'
import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { TextArea } from '@/components/ui/textarea'
import { P } from '@/components/ui/typography'
import { useRouter } from '@/i18n/navigation'
import { saveFileToBucket } from '@/lib/bucket'
import { sendAppointmentCreationEmail } from '@/lib/email'
import { doctorSpecialties } from '@/mocks/shared'
import { patientAppointmentFormValuesSchema } from '@/shared/schemas'
import {
  PatientAppointment,
  PatientAppointmentFormValues,
  SelectOption,
  SupportedLocales,
  Doctor,
  PatientEditAppointmentFormValuesDto,
  PatientCreateAppointmentFormValuesDto
} from '@/shared/types'
import { cn } from '@/utils/utils'

interface AppointmentFormProps {
  appointment?: PatientAppointment
}

export const PatientAppointmentForm = ({ appointment }: AppointmentFormProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  const isEditMode = !!appointment?._id
  const locale = useLocale()
  const t = useTranslations('forms')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFileLoading, setFileLoading] = useState(false)

  const { control, handleSubmit, watch, setValue } = useForm<PatientAppointmentFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(patientAppointmentFormValuesSchema),
    defaultValues: {
      reason: appointment?.reason ?? '',
      startTime: appointment?.startTime,
      description: appointment?.description ?? '',
      analyses: appointment?.analyses ?? [],
      doctorId: appointment?.doctorName ?? '',
      fileName: appointment?.fileName ?? '',
      specialty: appointment?.doctorPosition ?? '',
      startTimeHours: isEditMode ? `${getHours(appointment?.startTime)}:00` : undefined
    }
  })

  const { data: doctors } = useSearchDoctorQuery(watch('specialty'))
  const { data: analysesData } = useGetAnalysisQuery(session?.user?.id || '')

  const { mutateAsync: createAppointment } = useCreateAppointmentMutation(session?.user?.id || '')
  const { mutateAsync: updateAppointment } = useUpdatePatientAppointmentMutation(
    session?.user?.id || '',
    appointment?._id || ''
  )

  const doctorOptions = useMemo(() => {
    return doctors?.map((doctor: Doctor) => ({ value: doctor._id, label: doctor.doctorName })) || []
  }, [doctors])

  const fileName = watch('fileName') ?? ''
  const startTime = watch('startTime')

  const onSubmit: SubmitHandler<PatientAppointmentFormValues> = async (values) => {
    if (!session?.user.id) return

    if (isEditMode) {
      const editAppointment: PatientEditAppointmentFormValuesDto = {
        ...appointment,
        ...values
      }

      const result = await updateAppointment({
        patientId: session.user.id,
        appointmentId: appointment._id,
        data: editAppointment
      })

      if (result) {
        toast.success(t('notifications.visitUpdateSuccess'))

        router.push(`/appointments/${result._id}`)
      } else {
        toast.error(t('notifications.visitUpdateError'))
      }
    } else {
      const newAppointment: PatientCreateAppointmentFormValuesDto = {
        ...values,
        startTime: formatISO(addHours(new Date(values.startTime), Number(values.startTimeHours.split(':')[0]))),
        endTime: formatISO(addHours(new Date(values.startTime), Number(values.startTimeHours.split(':')[0]) + 1))
      }

      const result = await createAppointment({
        patientId: session.user.id,
        data: newAppointment
      })

      if (result) {
        toast.success(t('notifications.visitCreateSuccess'))
        await sendAppointmentCreationEmail(locale as SupportedLocales, result)

        router.push(`/appointments/${result._id}`)
      } else {
        toast.success(t('notifications.visitCreateError'))
      }
    }
  }

  const handleUploadFile = async (file: File) => {
    setFileLoading(true)

    const timestamp = Date.now()
    const extension = file.name.split('.').pop()

    const fileName = await saveFileToBucket(file, `appointment_${timestamp}.${extension}`, 'beclinic/custom/files')
    setValue('fileName', fileName)

    setFileLoading(false)
  }

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
  } = useFieldArray<PatientAppointmentFormValues>({
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
            {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
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
              disabled={isEditMode}
              options={doctorSpecialties}
              placeholder={t('appointmentForm.appointmentSpecialization.placeholder')}
              {...field}
              localized
            />
            {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
          </div>
        )}
      />

      <Controller
        name='doctorId'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='mb-4'>
            <P className='font-medium mb-2'>{t('appointmentForm.appointmentDoctor.label')}</P>

            {isEditMode ? (
              <div className='flex w-full items-center justify-between gap-2 font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 bg-white'>
                {appointment.doctorName}
              </div>
            ) : (
              <StyledSelect
                options={doctorOptions}
                disabled={!watch('specialty')}
                placeholder={t('appointmentForm.appointmentDoctor.placeholder')}
                {...field}
              />
            )}

            {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
          </div>
        )}
      />

      <div className='sm:flex sm:justify-between sm:gap-4 mb-4'>
        <div className='mb-4 w-full sm:mb-0'>
          <Controller
            name='startTime'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <P className='font-medium mb-2'>{t('appointmentForm.appointmentDate.label')}</P>
                <StyledDatePicker
                  disabled={isEditMode}
                  initialDate={field.value}
                  hintFormat='dd/MM/yyyy'
                  placeholder={t('appointmentForm.appointmentDate.placeholder')}
                  errorText={(error?.message && <ErrorText>{t(error.message)}</ErrorText>) || null}
                  {...field}
                />
                {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
              </>
            )}
          />
        </div>
        <div className='w-full h-full'>
          <Controller
            name='startTimeHours'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <P className='font-medium mb-2'>{t('appointmentForm.appointmentTime.label')}</P>
                <StyledSelect
                  disabled={isEditMode || !watch('startTime')}
                  triggerClassName='h-[38px]'
                  options={timeOptions}
                  placeholder={t('appointmentForm.appointmentTime.placeholder')}
                  {...field}
                />
                {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
              </>
            )}
          />
        </div>
      </div>
      <div className='mt-1.5 w-full'>
        <Controller
          name='description'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Label htmlFor='description'>{t('appointmentForm.appointmentDescription.label')}</Label>
              <TextArea
                id='description'
                placeholder={t('appointmentForm.appointmentDescription.placeholder')}
                {...field}
              />
              {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
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
        {!analysesData ? (
          <div
            className='inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-100 border-r-transparent align-[-0.125em]'
            role='status'
            aria-label='loading'
          />
        ) : (
          <SelectAnalysesModal
            analyses={analysesData}
            appendData={appendAnalyses}
            removeData={removeAnalyses}
            selectedAnalyses={analyses}
            locale={locale as SupportedLocales}
          />
        )}
      </div>

      <div className='mt-4 w-full'>
        <Controller
          name='fileName'
          control={control}
          render={({ fieldState: { error } }) => (
            <>
              <Label htmlFor='fileName'>{t('appointmentForm.appointmentFiles.label')}</Label>
              <div className='flex items-center gap-3'>
                {!fileName && (
                  <Button
                    type='button'
                    disabled={isFileLoading}
                    onClick={() => {
                      fileInputRef.current?.click()
                    }}>
                    {isFileLoading && <Spinner className='mr-2' />}
                    {t('appointmentForm.appointmentFiles.addButton')}
                  </Button>
                )}

                {fileName ? <AttachmentPreviewModal attachment={fileName} /> : null}

                {fileName && (
                  <Button
                    type='button'
                    variant='reset'
                    onClick={() => {
                      setValue('fileName', '')
                    }}>
                    {t('cancel')}
                  </Button>
                )}

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

              {error?.message && <ErrorText>{t(error.message)}</ErrorText>}
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
