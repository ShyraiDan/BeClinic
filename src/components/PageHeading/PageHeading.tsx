import Image from 'next/image'

import { H2 } from '@/components/ui/typography'

interface PageHeadingProps {
  children?: React.ReactNode
  title?: string
}

export const PageHeading = ({ children, title }: PageHeadingProps) => {
  return (
    <section className='relative flex h-[330px] w-full flex-col justify-end overflow-hidden'>
      <Image src='/header_bg.jpg' alt='' fill priority sizes='100vw' className='object-cover' aria-hidden />

      <div className='relative z-10 mx-auto w-full max-w-[1200px] px-4 py-[44px]'>
        {title && <H2 className='text-white mt-4 mb-1'>{title}</H2>}
        {children}
      </div>
    </section>
  )
}
