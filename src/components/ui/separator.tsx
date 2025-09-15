import { cn } from '@/utils/utils'

export const Separator = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return <div className={cn('my-4 h-[1px] w-full bg-grey-200', className)} {...props} />
}
