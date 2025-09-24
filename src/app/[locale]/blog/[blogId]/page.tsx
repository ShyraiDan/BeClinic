import { Pencil } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import { Suspense } from 'react'

import { auth } from '@/auth'
import { DeleteBlogButton } from '@/components/DeleteBlogButton/DeleteBlogButton'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H1 } from '@/components/ui/typography'
import { getSingleBlog } from '@/lib/blog'
import { getMarkdownFromS3 } from '@/lib/blogFiles'
import { SupportedLocales } from '@/shared/types'

interface SingleBlogPageProps {
  params: Promise<{ locale: SupportedLocales; blogId: string }>
}

const SingleBlogPage = async ({ params }: SingleBlogPageProps) => {
  const { locale, blogId } = await params
  const session = await auth()
  const blog = await getSingleBlog(blogId)
  const post = await getMarkdownFromS3(blog?.description[locale] ?? '')
  const isAuthor = session?.user.id === blog.authorId

  return (
    <>
      <PageHeading>
        <div className='flex items-center justify-between'>
          <H1 className='text-white mt-4 mb-1 text-[36px]'>{blog.title[locale]}</H1>

          {isAuthor && (
            <div className='flex gap-2'>
              <StyledLinkButton variant='icon' href={`/blog/${blog?._id}/edit`}>
                <Pencil size={16} />
              </StyledLinkButton>
              <DeleteBlogButton />
            </div>
          )}
        </div>
      </PageHeading>
      <Suspense fallback={<LoadingContainer />}>
        <Container>
          <article className='markdown-body'>
            <Image
              src='/no-image.jpg'
              alt='doctor'
              unoptimized
              className='w-full h-full max-h-[440px] mb-10 object-cover'
              width={730}
              height={440}
            />

            <Markdown>{post.content}</Markdown>
          </article>
        </Container>
      </Suspense>
    </>
  )
}

export default SingleBlogPage
