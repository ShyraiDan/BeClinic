'use client'

import { format, isAfter, isBefore } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Pencil } from 'lucide-react'
import { notFound, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useDeleteAppointmentMutation, useGetSinglePatientAppointmentQuery } from '@/client/appointment'
import { AnalysisCard } from '@/components/AnalysisCard/AnalysisCard'
import { MedicineCard } from '@/components/MedicineCard/MedicineCard'
import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import DeleteAppointmentModal from '@/components/modals/DeleteAppointmentModal/DeleteAppointmentModal'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { Container, LoadingContainer } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H4, H2, P } from '@/components/ui/typography'
import { useRouter } from '@/i18n/navigation'
import { SupportedLocales, PatientAppointment } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

interface PastAppointmentProps {
  locale: SupportedLocales
  appointmentData: PatientAppointment
}

interface UpcomingAppointmentProps {
  locale: SupportedLocales
  appointmentData: PatientAppointment
}

const PastAppointment = ({ locale, appointmentData }: PastAppointmentProps) => {
  const t = useTranslations('page')

  return (
    <>
      <H4>{t('singleAppointmentPage.appointmentCentre')}</H4>
      <P>{appointmentData?.reason || '-'}</P>
      <Separator className='bg-grey-100' />

      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentDetails')}</H4>
      <P>{appointmentData?.description || '-'}</P>
      <Separator className='bg-grey-100' />

      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentAnalyses')}</H4>
      <div className='flex flex-col gap-4'>
        {appointmentData?.analyses?.map((analysis) => (
          <AnalysisCard key={analysis._id} analysis={analysis} locale={locale} />
        ))}
        {appointmentData?.analyses?.length === 0 && <P>-</P>}
      </div>

      <Separator className='bg-grey-100' />

      <H4 className='mb-2'>{t('singleAppointmentPage.diagnosis')}</H4>
      <P>{appointmentData?.diagnosis || '-'}</P>
      <Separator className='bg-grey-100' />

      <H4 className='mb-2'>{t('singleAppointmentPage.treatment')}</H4>
      <div className='flex flex-col gap-4'>
        <div className='px-4 w-full grid gap-4 grid-cols-[100px_75px_1fr] sm:grid-cols-[100px_100px_1fr]'>
          <P className='text-xs'>{t('singleAppointmentPage.medicine')}</P>
          <P className='text-xs'>{t('singleAppointmentPage.dosage')}</P>
          <P className='text-xs'>{t('singleAppointmentPage.comment')}</P>
        </div>
        {appointmentData?.medicine && appointmentData.medicine.length > 0 ? (
          appointmentData.medicine.map((medicine) => <MedicineCard key={medicine.medicineName} medicine={medicine} />)
        ) : (
          <P>-</P>
        )}
      </div>
      <Separator className='bg-grey-100' />

      {appointmentData?.fileName && <AttachmentPreviewModal attachment={appointmentData.fileName} />}

      <H4>{t('singleAppointmentPage.doctorComment')}</H4>
      <P>{appointmentData?.treatment || '-'}</P>
    </>
  )
}

const UpcomingAppointment = ({ appointmentData, locale }: UpcomingAppointmentProps) => {
  const t = useTranslations('page')

  return (
    <>
      <div className='flex justify-between'>
        <div>
          <H4>{t('singleAppointmentPage.appointmentCentre')}</H4>
        </div>
        <div>
          <StyledLinkButton
            href='/contacts'
            target='_blank'
            className='p-2 bg-blue-100 text-white normal-case tracking-normal mt-1'>
            {t('singleAppointmentPage.seeOnMap')}
          </StyledLinkButton>
        </div>
      </div>

      <Separator className='bg-grey-100' />
      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentReason')}</H4>
      <P>{appointmentData?.reason || '-'}</P>

      <Separator className='bg-grey-100' />
      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentDetails')}</H4>
      <P>{appointmentData?.description || '-'}</P>

      <Separator className='bg-grey-100' />
      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentAnalyses')}</H4>
      <div className='flex flex-col gap-4'>
        {appointmentData?.analyses && appointmentData.analyses.length > 0 ? (
          appointmentData.analyses.map((analysis) => (
            <AnalysisCard key={analysis._id} analysis={analysis} locale={locale} />
          ))
        ) : (
          <P>-</P>
        )}
      </div>

      {appointmentData?.fileName && (
        <>
          <Separator className='bg-grey-100' />
          <H4 className='mb-2'>{t('singleAppointmentPage.additionalFiles')}</H4>
          {appointmentData.fileName}
          <AttachmentPreviewModal attachment={appointmentData.fileName} />
        </>
      )}
    </>
  )
}

const PatientSingleAppointmentPage = () => {
  const { locale, appointmentId } = useParams<{ locale: string; appointmentId: string }>()
  const { data: session } = useSession()
  const router = useRouter()

  const t = useTranslations('page')

  const dateLocale = dateLocaleMap[locale] ?? enUS

  const { data: appointmentData, isLoading } = useGetSinglePatientAppointmentQuery(
    session?.user.id || '',
    appointmentId
  )
  const { mutateAsync: deleteAppointment } = useDeleteAppointmentMutation(appointmentId)

  const isDataLoading = isLoading || !appointmentData

  if (!appointmentData && !isLoading) {
    notFound()
  }

  const handleDeleteAppointment = async () => {
    const res = await deleteAppointment({ appointmentId })

    if (res) {
      toast.success('singleAnalysisPage.notifications.deleteAppointmentSuccess')
      router.push(`/patient/${session?.user.id}?tab=appointments`)
    } else {
      toast.error('singleAnalysisPage.notifications.deleteAppointmentError')
    }
  }

  return (
    <>
      <PageHeading>
        {isDataLoading ? (
          <SkeletonText className='h-10 mb-2.5 mt-5.5 w-[270px] bg-white opacity-10' />
        ) : (
          <H2 className='text-white mt-4 mb-1'>
            {t('singleAppointmentPage.appointmentTo', {
              position: t(`profile.doctor.specialties.${appointmentData.doctorPosition}`)
            })}
          </H2>
        )}

        <div className='flex items-center w-full justify-between'>
          <div>
            {isDataLoading ? (
              <SkeletonText className='h-4 mb-1 w-[240px] bg-white opacity-10' />
            ) : (
              <P className='text-white capitalize'>
                {t('singleAppointmentPage.appointmentDoctor', { name: appointmentData.doctorName })}
              </P>
            )}

            {isDataLoading ? (
              <SkeletonText className='h-4 mb-1 w-[270px] bg-white opacity-10' />
            ) : (
              <P className='text-white'>
                {t('singleAppointmentPage.appointmentDate')}{' '}
                <span className='capitalize'>
                  {format(appointmentData.startTime, 'MMM dd, yyyy HH:mm', { locale: dateLocale })} -{' '}
                  {format(appointmentData.endTime, 'MMM dd, yyyy HH:mm', { locale: dateLocale })}
                </span>
              </P>
            )}
          </div>

          <div className='flex gap-4 text-white'>
            {!isDataLoading && isAfter(appointmentData?.endTime, new Date()) && (
              <StyledLinkButton variant='icon' href={`/appointments/${appointmentData?._id}/edit`}>
                <Pencil size={16} />
              </StyledLinkButton>
            )}
            <DeleteAppointmentModal allowedAction={handleDeleteAppointment} />
          </div>
        </div>
      </PageHeading>

      {isLoading ? (
        <LoadingContainer />
      ) : (
        <Container>
          {!isDataLoading && isAfter(appointmentData?.endTime, new Date()) && appointmentData && (
            <UpcomingAppointment appointmentData={appointmentData} locale={locale as SupportedLocales} />
          )}

          {!isDataLoading && isBefore(appointmentData?.endTime, new Date()) && appointmentData && (
            <PastAppointment appointmentData={appointmentData} locale={locale as SupportedLocales} />
          )}
        </Container>
      )}
    </>
  )
}
export default PatientSingleAppointmentPage
