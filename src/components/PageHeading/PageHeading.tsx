import { H2 } from '@/components/ui/typography'

interface PageHeadingProps {
  children?: React.ReactNode
  title?: string
}

export const PageHeading = ({ children, title }: PageHeadingProps) => {
  return (
    <section className='flex flex-col justify-end bg-[url("/header_bg.jpg")] h-[330px] bg-no-repeat bg-cover w-full brightness-[1.15]'>
      <div className='mx-auto max-w-[1200px] w-full py-[44px] px-4'>
        {title && <H2 className='text-white mt-4 mb-1'>{title}</H2>} {children}
      </div>
    </section>
  )
}
