import { cn } from '@/lib/utils'

export const Separator = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return <div className={cn('my-4 h-[1px] w-full bg-[#edeff1]', className)} {...props} />
}
