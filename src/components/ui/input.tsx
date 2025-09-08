import * as React from 'react'

import { cn } from '@/lib/utils'

export const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn('font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full bg-white', className)}
      {...props}
    />
  )
}
