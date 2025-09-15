import { cn } from '@/utils/utils'

import { P } from './typography'

export const ErrorText = ({ children, className }: React.ComponentProps<'p'>) => {
  return <P className={cn('text-red-100 mt-1.5 text-sm', className)}>{children}</P>
}
