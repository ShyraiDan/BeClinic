import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/utils'

const buttonVariants = cva(
  'flex items-center justify-center py-2.5 px-5 font-primary font-bold rounded cursor-pointer transition-all ease-linear duration-150 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-300 text-white hover:bg-blue-200 hover:text-white',
        outline: 'bg-transparent border border-solid border-white text-white hover:text-blue-200 hover:border-blue-200',
        icon: 'bg-blue-300 p-3 rounded-2xl w-10 h-10 hover:bg-blue-200',
        'outline-blue':
          'tracking-[2px] px-5 py-3 uppercase font-bold font-primary text-blue-100 text-xs border border-solid border-blue-100 hover:text-white hover:bg-blue-100',
        reset: 'bg-transparent border border-solid border-red-100 text-red-100 hover:border-red-700 hover:text-red-700',
        'date-picker': 'font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full bg-white',
        'calendar-button': 'p-0'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const Button = ({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) => {
  const Comp = asChild ? Slot : 'button'

  return <Comp data-slot='button' className={cn(buttonVariants({ variant, className }))} {...props} />
}

export { Button, buttonVariants }
