import { cn } from '@/utils/utils'

export const DoctorCardSkeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('animate-pulse bg-gray-100', className)} {...props}>
      <div className='w-full h-[270px] bg-gray-300 sm:w-full sm:h-[350px] md:h-[220px]' />
      <div className='pt-5 px-4 mb-3.5'>
        <div className='h-2.5 w-[80px] bg-gray-300 mb-0.5' />
        <div className='h-4 w-[120px] bg-gray-300 mb-0.5' />
      </div>
      <div className='ml-4 pb-[30px]'>
        <div className='h-3.5 w-[100px] bg-gray-300 mb-0.5' />
        <div className='h-3.5 w-[100px] bg-gray-300 mb-0.5' />
      </div>
    </div>
  )
}
