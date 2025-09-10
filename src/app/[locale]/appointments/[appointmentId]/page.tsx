import { format, isAfter, isBefore, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { AnalysisCard } from '@/components/AnalysisCard/AnalysisCard'
import { AttachmentPreviewModal } from '@/components/modals/AttachmentPreviewModal/AttachmentPreviewModal'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H4, H2, P } from '@/components/ui/typography'
import { mockedAppointment } from '@/mocks/mockedAppointment'
import { SupportedLocales, Appointment } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

interface SingleAppointmentPageProps {
  params: Promise<{ appointmentId: string; locale: SupportedLocales }>
}

interface PastAppointmentProps {
  locale: SupportedLocales
  appointmentData: Appointment
}

interface UpcomingAppointmentProps {
  locale: SupportedLocales
  appointmentData: Appointment
}

const PastAppointment = ({ locale, appointmentData }: PastAppointmentProps) => {
  const t = useTranslations('page')

  return (
    <>
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

      {/* <H4 className='mb-2'>Діагноз</H4>
      <P>{appointmentData?.diagnosis || '-'}</P> 
      <Separator className='bg-[#D1D1D1]' /> */}

      {/* <H4 className='mb-2'>Призначені препарати</H4>
      <div className='flex flex-col gap-4'>
        <div className='px-4 w-full grid gap-4 grid-cols-[100px_75px_1fr] sm:grid-cols-[100px_100px_1fr]'>
          <P className='text-xs'>Препарат</P>
          <P className='text-xs'>Приймати, днів</P>
          <P className='text-xs'>Коментар</P>
        </div>
        {appointmentData?.medicine && appointmentData.medicine.length > 0 ? (
          appointmentData.medicine.map((medicine) => <MedicineCard key={medicine.medicineName} medicine={medicine} />)
        ) : (
          <P>-</P>
        )}
      </div>
      <Separator className='bg-[#D1D1D1]' /> */}

      {appointmentData?.fileName && <AttachmentPreviewModal attachment={appointmentData.fileName} />}

      {/* <H4>Коментар лікаря</H4>
      <P>{appointmentData?.treatment || '-'}</P> */}
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

      {/* {appointmentData.treatment && (
        <>
          <Separator className='bg-[#D1D1D1]' />
          <H4 className='mb-2'>Діагноз</H4>
          <P>{appointmentData?.diagnosis || '-'}</P>{' '}
        </>
      )}

      {appointmentData.treatment && (
        <>
          <Separator className='bg-[#D1D1D1]' />
          <H4>Коментар лікаря</H4>
          <P>{appointmentData?.treatment || '-'}</P>{' '}
        </>
      )} */}
    </>
  )
}

const SingleAppointmentPage = async ({ params }: SingleAppointmentPageProps) => {
  const { locale } = await params
  const t = await getTranslations('page')

  const dateLocale = dateLocaleMap[locale] ?? enUS
  const isLoading = true

  const appointmentData = mockedAppointment[0]

  return (
    <>
      <PageHeading title=''>
        {isLoading ? (
          <SkeletonText className='h-10 mb-2.5 mt-5.5 w-[270px] bg-white opacity-10' />
        ) : (
          <H2 className='text-white mt-4 mb-1'>
            {t('singleAppointmentPage.appointmentTo', { position: appointmentData?.doctor?.position })}
          </H2>
        )}

        <div className='flex items-center w-full justify-between'>
          <div>
            {isLoading ? (
              <SkeletonText className='h-4 mb-1 w-[240px] bg-white opacity-10' />
            ) : (
              <P className='text-white capitalize'>
                {t('singleAppointmentPage.appointmentDoctor', { name: appointmentData?.doctor?.doctorName })}
              </P>
            )}

            {isLoading ? (
              <SkeletonText className='h-4 mb-1 w-[270px] bg-white opacity-10' />
            ) : (
              <P className='text-white'>
                {t('singleAppointmentPage.appointmentDate')}{' '}
                <span className='capitalize'>
                  {format(parseISO(appointmentData.startTime), 'MMM dd, yyyy HH:mm', { locale: dateLocale })} -{' '}
                  {format(parseISO(appointmentData.endTime), 'MMM dd, yyyy HH:mm', { locale: dateLocale })}
                </span>
              </P>
            )}
          </div>

          <div className='flex gap-4 text-white'>
            {isAfter(parseISO(appointmentData?.endTime), new Date()) && (
              <StyledLinkButton variant='icon' href={`/appointments/${appointmentData?._id}/edit`}>
                <Pencil size={16} />
              </StyledLinkButton>
            )}
          </div>
        </div>
      </PageHeading>
      <Container>
        {isAfter(parseISO(appointmentData?.endTime), new Date()) && appointmentData && (
          <UpcomingAppointment appointmentData={appointmentData} locale={locale} />
        )}

        {isBefore(parseISO(appointmentData?.endTime), new Date()) && appointmentData && (
          <PastAppointment appointmentData={appointmentData} locale={locale} />
        )}
      </Container>
    </>
  )
}
export default SingleAppointmentPage
