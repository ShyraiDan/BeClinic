import { format, isAfter, isBefore } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { AnalysisCard } from '@/components/AnalysisCard/AnalysisCard'
import { MedicineCard } from '@/components/MedicineCard/MedicineCard'
import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { PatientDetailsModal } from '@/components/modals/PatientDetailsModal/PatientDetailsModal'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H4, H2, P } from '@/components/ui/typography'
import { getSingleDoctorAppointment } from '@/lib/appointment'
import { SupportedLocales, DoctorAppointment } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

interface SingleAppointmentPageProps {
  params: Promise<{ appointmentId: string; locale: SupportedLocales; doctorId: string }>
}

interface PastAppointmentProps {
  locale: SupportedLocales
  appointmentData: DoctorAppointment
}

interface UpcomingAppointmentProps {
  locale: SupportedLocales
  appointmentData: DoctorAppointment
}

const PastAppointment = ({ locale, appointmentData }: PastAppointmentProps) => {
  const t = useTranslations('page')

  return (
    <>
      <H4>{t('singleAppointmentPage.patientDetails')}</H4>
      <PatientDetailsModal patient={appointmentData?.patient} />
      <Separator className='bg-[#D1D1D1]' />

      <H4>{t('singleAppointmentPage.appointmentReason')}</H4>
      <P>{appointmentData?.reason || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4>{t('singleAppointmentPage.appointmentCentre')}</H4>
      <P>{appointmentData?.reason || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentDetails')}</H4>
      <P>{appointmentData?.description || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentAnalyses')}</H4>
      <div className='flex flex-col gap-4'>
        {appointmentData?.analyses?.map((analysis) => (
          <AnalysisCard key={analysis._id} analysis={analysis} locale={locale} />
        ))}
        {appointmentData?.analyses?.length === 0 && <P>-</P>}
      </div>

      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('singleAppointmentPage.diagnosis')}</H4>
      <P>{appointmentData?.diagnosis || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

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
      <Separator className='bg-[#D1D1D1]' />

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
          <P>Вінниця</P>
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
      <Separator className='bg-[#D1D1D1]' />

      <H4>{t('singleAppointmentPage.patientDetails')}</H4>
      <PatientDetailsModal patient={appointmentData?.patient} />
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentReason')}</H4>
      <P>{appointmentData?.reason || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

      <H4 className='mb-2'>{t('singleAppointmentPage.appointmentDetails')}</H4>
      <P>{appointmentData?.description || '-'}</P>
      <Separator className='bg-[#D1D1D1]' />

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
          <Separator className='bg-[#D1D1D1]' />
          <H4 className='mb-2'>{t('singleAppointmentPage.additionalFiles')}</H4>
          <AttachmentPreviewModal attachment={appointmentData.fileName} />
        </>
      )}
    </>
  )
}

const DoctorSingleAppointmentPage = async ({ params }: SingleAppointmentPageProps) => {
  const { locale, appointmentId, doctorId } = await params
  const t = await getTranslations('page')

  const dateLocale = dateLocaleMap[locale] ?? enUS

  const appointment = await getSingleDoctorAppointment(doctorId, appointmentId)

  return (
    <>
      <PageHeading title=''>
        <H2 className='text-white mt-4 mb-1'>
          {t('singleAppointmentPage.visit', { patientName: appointment?.patient.userName })}
        </H2>

        <div className='flex items-center w-full justify-between'>
          <div>
            <P className='text-white'>
              {t('singleAppointmentPage.appointmentDate')}{' '}
              <span className='capitalize'>
                {format(appointment.startTime, 'MMM dd, yyyy HH:mm', { locale: dateLocale })} -{' '}
                {format(appointment.endTime, 'MMM dd, yyyy HH:mm', { locale: dateLocale })}
              </span>
            </P>
          </div>

          <div className='flex gap-4 text-white'>
            {isAfter(appointment?.endTime, new Date()) && (
              <StyledLinkButton variant='icon' href={`doctor/${doctorId}/appointments/${appointment?._id}/edit`}>
                <Pencil size={16} />
              </StyledLinkButton>
            )}
          </div>
        </div>
      </PageHeading>
      <Container>
        {isAfter(appointment?.endTime, new Date()) && appointment && (
          <UpcomingAppointment appointmentData={appointment} locale={locale} />
        )}

        {isBefore(appointment?.endTime, new Date()) && appointment && (
          <PastAppointment appointmentData={appointment} locale={locale} />
        )}
      </Container>
    </>
  )
}
export default DoctorSingleAppointmentPage
