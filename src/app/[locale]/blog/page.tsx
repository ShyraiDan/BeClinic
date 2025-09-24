import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import BlogCard from '@/components/BlogCard/BlogCard'
import { BlogFilters } from '@/components/BlogFilters/BlogFilters'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'
import { P } from '@/components/ui/typography'
import { getBlogs } from '@/lib/blog'

const BlogPage = async () => {
  const t = await getTranslations('page')
  const blogs = await getBlogs()

  return (
    <>
      <PageHeading title={t('blog.title')} />
      <Suspense fallback={<LoadingContainer />}>
        <Container>
          <BlogFilters length={blogs.length} />
          <div className='flex flex-col gap-10 max-w-[640px] mx-auto md:grid md:grid-cols-2 md:max-w-[100%]'>
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                return <BlogCard key={blog._id} blog={blog} />
              })
            ) : (
              <P>{t('blog.noBlogs')}</P>
            )}
          </div>
        </Container>
      </Suspense>
    </>
  )
}

export default BlogPage
