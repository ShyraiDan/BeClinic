import { ComponentProps } from 'react'

import { cn } from '@/utils/utils'

export const Spinner = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent align-[-0.125em]',
        className
      )}
      role='status'
      aria-label='loading'
      {...props}
    />
  )
}
