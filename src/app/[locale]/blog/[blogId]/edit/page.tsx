import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { BlogForm } from '@/components/forms/BlogForm/BlogForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'
import { getSingleBlog } from '@/lib/blog'

interface EditBlogPageProps {
  blogId: string
}

const EditBlogPage = async ({ blogId }: EditBlogPageProps) => {
  const blog = await getSingleBlog(blogId)

  if (!blog) {
    notFound()
  }

  return (
    <>
      <Container>
        <BlogForm blog={blog} />
      </Container>
    </>
  )
}

interface EditBlogPageWrapperProps {
  params: Promise<{ blogId: string }>
}

const EditBlogPageWrapper = async ({ params }: EditBlogPageWrapperProps) => {
  const { blogId } = await params

  const t = await getTranslations('page')

  return (
    <>
      <PageHeading title={t('editBlogPage.title')} />
      <Suspense fallback={<LoadingContainer />}>
        <EditBlogPage blogId={blogId} />
      </Suspense>
    </>
  )
}

export default EditBlogPageWrapper
