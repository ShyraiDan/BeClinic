import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const linkButtonVariants = cva(
  'inline-block text-xs font-bold font-primary uppercase tracking-[2px] px-5 py-3 rounded transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'text-white bg-blue-100 hover:bg-purple-100',
        outline: 'text-blue-100 border border-solid border-blue-100 hover:text-purple-100 hover:border-purple-100'
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
