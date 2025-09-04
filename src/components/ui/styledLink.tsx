import Link from 'next/link'

import { cn } from '@/lib/utils'

export const StyledLink = ({ children, className, ...props }: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      className={cn(
        'flex font-primary text-blue-300 transition-all duration-300 ease-in-out hover:text-purple-100',
        className
      )}
      {...props}>
      {children}
    </Link>
  )
}
