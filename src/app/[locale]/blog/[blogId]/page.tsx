import { Pencil } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'

import { DeleteBlogButton } from '@/components/DeleteBlogButton/DeleteBlogButton'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H1 } from '@/components/ui/typography'
import { mockedBlogs } from '@/mocks/mockedBlogs.mock'
import { SupportedLocales } from '@/shared/types'

interface SingleBlogPageProps {
  params: Promise<{ locale: SupportedLocales }>
}

const SingleBlogPage = async ({ params }: SingleBlogPageProps) => {
  const { locale } = await params
  const isAuth = true
  const blog = mockedBlogs[0]

  return (
    <>
      <PageHeading title={''}>
        <div className='flex items-center justify-between'>
          <H1 className='text-white mt-4 mb-1 text-[36px]'>{blog.title[locale]}</H1>

          {isAuth && (
            <div className='flex gap-2'>
              <StyledLinkButton variant='icon' href={`/blog/${blog?._id}/edit`}>
                <Pencil size={16} />
              </StyledLinkButton>
              <DeleteBlogButton />
            </div>
          )}
        </div>
      </PageHeading>

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

          <Markdown>{blog.description[locale]}</Markdown>
        </article>
      </Container>
    </>
  )
}

export default SingleBlogPage
