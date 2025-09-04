import { cn } from '@/lib/utils'

export const Container = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('my-12 py-2 px-4 xl:max-w-[1200px] xl:mx-auto', className)} {...props}>
      {children}
    </div>
  )
}
