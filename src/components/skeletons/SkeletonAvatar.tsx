import { cn } from '@/lib/utils'

export const SkeletonAvatar = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex items-center space-x-4 animate-pulse w-[80px] h-[80px] bg-gray-300 rounded-full', className)}
      {...props}
    />
  )
}
