import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'flex items-center justify-center py-2.5 px-5 font-primary font-bold rounded cursor-pointer transition-all ease-linear duration-150 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-300 text-white hover:bg-purple-100 hover:text-white',
        outline:
          'bg-transparent border border-solid border-blue-300 text-blue-300 hover:bg-purple-100 hover:text-white',
        icon: 'bg-blue-300 p-3 rounded-2xl w-10 h-10 enabled:hover:bg-purple-100'
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
