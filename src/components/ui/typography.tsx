import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const H1 = ({ children, className }: ComponentProps<'h1'>) => {
  return <h1 className={cn('font-bold font-primary text-[22px] text-primary xl:text-[36px]', className)}>{children}</h1>
}

H1.displayName = 'H1'

export const H2 = ({ children, className }: ComponentProps<'h2'>) => {
  return <h2 className={cn('font-bold font-primary text-[36px] text-primary', className)}>{children}</h2>
}

H2.displayName = 'H2'

export const H3 = ({ children, className }: ComponentProps<'h3'>) => {
  return <h3 className={cn('font-bold font-primary text-[26px] text-primary', className)}>{children}</h3>
}

H3.displayName = 'H3'

export const H4 = ({ children, className }: ComponentProps<'h4'>) => {
  return <h4 className={cn('font-bold font-primary text-[24px] text-primary', className)}>{children}</h4>
}

H4.displayName = 'H4'

export const H5 = ({ children, className }: ComponentProps<'h5'>) => {
  return <h5 className={cn('font-regular font-primary text-xl text-primary', className)}>{children}</h5>
}

H5.displayName = 'H5'

export const H6 = ({ children, className }: ComponentProps<'h6'>) => {
  return <h6 className={cn('font-bold font-primary text-lg text-primary', className)}>{children}</h6>
}

H6.displayName = 'H6'

export const P = ({ children, className }: ComponentProps<'p'>) => {
  return <p className={cn('font-primary', className)}>{children}</p>
}

P.displayName = 'P'
