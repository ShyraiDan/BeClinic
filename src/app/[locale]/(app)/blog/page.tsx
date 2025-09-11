import { useTranslations } from 'next-intl'

import BlogCard from '@/components/BlogCard/BlogCard'
import { BlogFilters } from '@/components/BlogFilters/BlogFilters'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'
import { mockedBlogs } from '@/mocks/mockedBlogs.mock'

const BlogPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('blog.title')} />
      <Container>
        <BlogFilters length={1} />
        <div className='flex flex-col gap-10 max-w-[640px] mx-auto md:grid md:grid-cols-2 md:max-w-[100%]'>
          {mockedBlogs.map((blog) => {
            return <BlogCard key={blog._id} blog={blog} />
          })}
        </div>
      </Container>
    </>
  )
}

export default BlogPage
