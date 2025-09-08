import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const linkButtonVariants = cva(
  'flex items-center justify-center text-xs font-bold font-primary uppercase tracking-[2px] px-5 py-3 rounded cursor-pointer transition-all duration-300 ease-in-out pointer-events-auto',
  {
    variants: {
      variant: {
        default: 'text-white bg-blue-100 hover:bg-blue-100',
        'outline-white':
          'text-white border border-solid border-white hover:text-white hover:bg-blue-100 hover:border-blue-100',
        'outline-blue': 'text-blue-100 border border-solid border-blue-100 hover:text-white hover:bg-blue-100',
        icon: 'bg-blue-300 p-3 rounded-2xl w-10 h-10 text-white hover:bg-blue-200'
      }
    }
  }
)

interface StyledLinkButtonProps extends React.ComponentProps<typeof Link>, VariantProps<typeof linkButtonVariants> {}

export const StyledLinkButton = ({ children, className, variant = 'default', ...props }: StyledLinkButtonProps) => {
  return (
    <Link className={cn(linkButtonVariants({ variant, className }))} {...props}>
      {children}
    </Link>
  )
}
