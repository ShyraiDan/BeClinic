'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils/utils'

interface StyledDatePickerProps {
  placeholder: string
  initialDate?: string
  calendarModalStyles?: string
  showOutsideDays?: boolean
  disabled?: boolean
  onChange?: (date: Date) => void
}

export const StyledDatePicker = ({
  initialDate,
  disabled,
  onChange,
  calendarModalStyles,
  showOutsideDays,
  placeholder
}: StyledDatePickerProps) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(initialDate ? new Date(initialDate) : undefined)

  useEffect(() => {
    if (onChange) {
      if (!date) return

      onChange(date)
    }
  }, [date, onChange])

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
          onSelect={(date) => {
            setDate(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
