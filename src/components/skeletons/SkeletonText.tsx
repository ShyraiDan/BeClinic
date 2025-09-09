import { cn } from '@/lib/utils'

export const SkeletonText = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div className={cn('space-y-2 animate-pulse bg-gray-300 rounded-sm', className)} {...props} />
}
