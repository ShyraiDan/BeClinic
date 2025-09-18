'use client'

import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { useState, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils/utils'

interface StyledDatePickerProps {
  placeholder: string
  hintFormat: string
  onChange: (date: Date) => void
  initialDate?: Date
  calendarModalStyles?: string
  showOutsideDays?: boolean
  disabled?: boolean
  errorText?: ReactNode | null
}

export const StyledDatePicker = ({
  initialDate,
  disabled,
  onChange,
  calendarModalStyles,
  showOutsideDays,
  placeholder,
  hintFormat,
  errorText = null
}: StyledDatePickerProps) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(initialDate ? new Date(initialDate) : undefined)

  const handleSelect = (value: Date) => {
    if (value) {
      onChange(value)
    }

    setDate(value)
  }

  const handleOpenChange = () => {
    if (disabled) return
    setOpen((state) => !state)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='date-picker' disabled={disabled} id='date' className='w-full justify-between font-normal'>
          {date ? date.toLocaleDateString() : placeholder}
          <ChevronDownIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-auto overflow-hidden p-0 border border-grey-400', calendarModalStyles)}
        align='start'>
        <Calendar
          mode='single'
          selected={date}
          captionLayout='dropdown'
          showOutsideDays={showOutsideDays}
          onSelect={handleSelect}
          footer={errorText ?? (date ? `You picked ${format(date, hintFormat)}.` : 'Please pick a date.')}
          required={true}
        />
      </PopoverContent>
    </Popover>
  )
}
