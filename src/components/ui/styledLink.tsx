import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from '@/utils/utils'

const styledLinkVariants = cva('flex font-primary text-blue-300 transition-all duration-300 ease-in-out ', {
  variants: {
    variant: {
      default: 'hover:text-blue-200',
      burger: 'text-black-100 text-lg hover:text-blue-200'
    }
  }
})

interface StyledLinkProps extends React.ComponentProps<typeof Link>, VariantProps<typeof styledLinkVariants> {}

export const StyledLink = ({ children, className, variant = 'default', ...props }: StyledLinkProps) => {
  return (
    <Link className={cn(styledLinkVariants({ variant, className }))} {...props}>
      {children}
    </Link>
  )
}
