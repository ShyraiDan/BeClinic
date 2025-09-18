'use client'

import { useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Option } from '@/shared/types'

import type { SelectProps } from '@radix-ui/react-select'

interface StyledSelectProps extends SelectProps {
  placeholder: string
  onChange: (value: string) => void
  options: Option[]
  triggerClassName?: string
  disabled?: boolean
}

export const StyledSelect = ({
  options,
  triggerClassName,
  placeholder,
  disabled,
  onChange,
  ...props
}: StyledSelectProps) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (v: string) => {
    onChange(v)
  }

  const handleOpenChange = () => {
    if (disabled) return
    setOpen((state) => !state)
  }

  return (
    <Select {...props} onOpenChange={handleOpenChange} open={open} onValueChange={handleSelect}>
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {!disabled && (
        <SelectContent>
          {options.map((option: Option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  )
}
