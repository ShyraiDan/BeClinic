import { getLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import BlogCard from '@/components/BlogCard/BlogCard'
import { BlogFilters } from '@/components/BlogFilters/BlogFilters'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { P } from '@/components/ui/typography'
import { getBlogs } from '@/lib/blog'

import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()

  const t = await getTranslations({ locale, namespace: 'seo' })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_PRODUCTION_URL!),
    applicationName: t('blog.title'),
    title: t('blog.title'),
    description: t('index.description'),

    keywords: ['медицина', 'онлайн запис', 'лікарі', 'онлайн медкарта', 'clinic', 'appointments', 'аналіз', 'analysis'],
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/${locale}/blog`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/en/blog`,
        uk: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/uk/blog`
      }
    },
    openGraph: {
      type: 'website',
      url: process.env.NEXT_PUBLIC_PRODUCTION_URL!,
      siteName: t('blog.title'),
      title: t('blog.title'),
      description: t('index.description'),
      images: [
        { url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/favicon.ico`, width: 1200, height: 630, alt: 'BeClinic' }
      ],
      locale: 'uk_UA',
      alternateLocale: ['en_US']
    }
  }
}

interface BlogPageParams {
  searchParams: Promise<Record<string, string | undefined>>
}

const BlogPage = async ({ searchParams }: BlogPageParams) => {
  const { page: pageParam, pageSize: pageSizeParam } = await searchParams

  const currentPage = parseInt(pageParam || '1')
  const pageSize = parseInt(pageSizeParam || '6')
  const t = await getTranslations('page')
  const { data: blogs, total, page } = await getBlogs(currentPage, pageSize)

  return (
    <>
      <PageHeading title={t('blog.title')} />
      <Suspense fallback={<LoadingContainer />}>
        <Container>
          <BlogFilters length={total} />
          <div className='flex flex-col gap-10 max-w-[640px] mx-auto md:grid md:grid-cols-2 md:max-w-[100%]'>
            {blogs.length > 0 ? (
              <>
                {blogs.map((blog) => {
                  return <BlogCard key={blog._id} blog={blog} />
                })}
              </>
            ) : (
              <P>{t('blog.noBlogs')}</P>
            )}
          </div>

          {blogs.length !== 0 && (
            <div className='mt-10'>
              <PaginationWithLinks page={page} pageSize={pageSize} totalCount={total} />
            </div>
          )}
        </Container>
      </Suspense>
    </>
  )
}

export default BlogPage
