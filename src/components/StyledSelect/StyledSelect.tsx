import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Option } from '@/shared/types'

interface StyledSelectProps {
  placeholder: string
  options: Option[]
  triggerClassName?: string
  disabled?: boolean
}

export const StyledSelect = ({ options, triggerClassName, placeholder, disabled }: StyledSelectProps) => {
  return (
    <Select>
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
