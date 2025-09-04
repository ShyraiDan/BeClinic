import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Option } from '@/shared/types'

interface StyledSelectProps {
  placeholder: string
  options: Option[]
  triggerClassName?: string
}

export const StyledSelect = ({ options, triggerClassName, placeholder }: StyledSelectProps) => {
  return (
    <Select>
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option: Option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
