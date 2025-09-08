'use client'

import { parseISO, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { StyledLink } from '@/components/ui/styledLink'
import { H3 } from '@/components/ui/typography'
import { Blog } from '@/shared/types'
import { dateLocaleMap } from '@/utils/dateLocaleMap'

import type { SupportedLocales } from '@/shared/types'

interface BlogCardProps {
  blog: Blog
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { locale } = useParams<{ locale: SupportedLocales }>()
  const t = useTranslations('page')
  const dateLocale = dateLocaleMap[locale] ?? enUS

  return (
    <article className='pb-[30px] shadow'>
      <Image
        src='/no-image.jpg'
        alt={blog.title[locale]}
        className='mb-4 object-cover w-full h-full max-h-[337px]'
        unoptimized
        width={600}
        height={337}
      />
      <div className='flex flex-col px-4'>
        <div className='flex items-center'>
          <CalendarDays size={16} className='mr-2 text-[#56b0d2]' />
          <span className='text-[#8f9395] text-sm px-[3px] capitalize'>
            {format(parseISO(blog.updatedAt ?? blog.createdAt), 'MMMM d, yyyy', { locale: dateLocale })}
          </span>
        </div>
        <H3 className='text-[#949494] mt-[5px]'>{blog.title[locale]}</H3>
      </div>
      <div className='flex px-4 mt-2'>
        <StyledLink href={`/blog/${blog._id}`} className='text-[#56b0d2] underline'>
          {t('blog.readMore')}
        </StyledLink>
      </div>
    </article>
  )
}

export default BlogCard
