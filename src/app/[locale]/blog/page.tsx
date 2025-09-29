import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import BlogCard from '@/components/BlogCard/BlogCard'
import { BlogFilters } from '@/components/BlogFilters/BlogFilters'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { P } from '@/components/ui/typography'
import { getBlogs } from '@/lib/blog'

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
