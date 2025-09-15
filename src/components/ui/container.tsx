import { cn } from '@/utils/utils'

export const Container = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('my-12 py-2 px-4 xl:max-w-[1200px] xl:mx-auto', className)} {...props}>
      {children}
    </div>
  )
}

export const LoadingContainer = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('py-2 px-4 h-[350px] lg:h-[500px] flex items-center justify-center', className)} {...props}>
      <div
        className='inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-100 border-r-transparent align-[-0.125em]'
        role='status'
        aria-label='loading'
      />
    </div>
  )
}
