'use client'

import enLocale from '@fullcalendar/core/locales/en-gb'
import ukLocale from '@fullcalendar/core/locales/uk'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { endOfMonth, isSameDay, parseISO, startOfMonth } from 'date-fns'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useRef, useState } from 'react'

import { useGetCalendarAppointmentQuery } from '@/client/appointment'
import CalendarAppointmentCard from '@/components/CalendarAppointmentCard/CalendarAppointmentCard'
import { AppointmentInfoModal } from '@/components/modals/AppointmentInfoModal/AppointmentInfoModal'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { H6, P } from '@/components/ui/typography'
import { DoctorAppointment, SupportedLocales } from '@/shared/types'
import { cn } from '@/utils/utils'

import type { EventClickArg, EventApi, DatesSetArg } from '@fullcalendar/core'

interface Range {
  start: string
  end: string
}

export const DoctorCalendarTab = () => {
  const t = useTranslations('page')
  const [dateRange, setDateRange] = useState<Range>({
    start: startOfMonth(new Date()).toISOString(),
    end: endOfMonth(new Date()).toISOString()
  })

  const params = useParams()
  const { locale } = params
  const [selectedEvent, setSelectedEvent] = useState<DoctorAppointment | null>(null)
  const { data: session } = useSession()

  const { data: appointments, isLoading } = useGetCalendarAppointmentQuery(
    session?.user?.id || '',
    dateRange.start,
    dateRange.end
  )
  const lastRangeRef = useRef<Range | null>(null)

  const currentEvents: EventApi[] = useMemo(() => {
    return (
      (appointments?.map((appointment) => ({
        id: appointment._id,
        title: appointment.patient.userName,
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime)
      })) as EventApi[]) ?? []
    )
  }, [appointments])

  const todayEvents: EventApi[] = useMemo(() => {
    return currentEvents.filter((event) => isSameDay(parseISO((event?.start || new Date()).toISOString()), new Date()))
  }, [currentEvents])

  const handleEventClick = (selected: EventClickArg) => {
    const selectedEvent = appointments?.find((appointment) => appointment._id === selected.event.id)
    if (selectedEvent) {
      setSelectedEvent(selectedEvent)
    }
  }

  const handleEventInfoModalClose = () => setSelectedEvent(null)

  const onDatesSet = useCallback((arg: DatesSetArg) => {
    const next: Range = { start: arg.startStr, end: arg.endStr }
    const prev = lastRangeRef.current

    if (prev && prev.start === next.start && prev.end === next.end) return

    lastRangeRef.current = next
    setDateRange(next)
  }, [])

  return (
    <div className='mt-6'>
      <div className='flex flex-col w-full justify-start items-start gap-8'>
        <div className='w-full h-[200px]'>
          <H6>{t('profile.doctor.todaysAppointments')}</H6>
          <ul
            className={cn(
              'flex flex-col gap-4 mt-4 overflow-y-auto h-[170px]',
              todayEvents.length === 0 && !isLoading && 'h-full mt-0'
            )}>
            {todayEvents.length === 0 && !isLoading && (
              <div className='flex flex-col items-center justify-center h-full'>
                <P className='italic text-center text-gray-400'>{t('profile.doctor.noAppointments')}</P>
              </div>
            )}

            {isLoading &&
              Array.from({ length: 2 }).map((_, index) => <SkeletonText className='w-full h-[84px]' key={index} />)}

            {todayEvents.length > 0 &&
              todayEvents.map((event: EventApi) => {
                return <CalendarAppointmentCard key={event.id} event={event} locale={locale as SupportedLocales} />
              })}
          </ul>
        </div>

        <div className='w-full'>
          <FullCalendar
            locales={[ukLocale, enLocale]}
            locale={locale === 'en' ? enLocale : ukLocale}
            height={'75vh'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            datesSet={onDatesSet}
            eventClick={handleEventClick}
            events={currentEvents.map((event) => ({
              id: event.id,
              title: event.title,
              start: event.start?.toISOString() ?? '',
              end: event.end?.toISOString() ?? ''
            }))}
          />
        </div>
      </div>

      {selectedEvent && (
        <AppointmentInfoModal
          open={!!selectedEvent}
          appointment={selectedEvent}
          handleClose={handleEventInfoModalClose}
        />
      )}
    </div>
  )
}
