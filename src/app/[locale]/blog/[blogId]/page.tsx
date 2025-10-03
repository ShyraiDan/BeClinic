import { Pencil } from 'lucide-react'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { auth } from '@/auth'
import { DeleteBlogModal } from '@/components/modals/DeleteBlogModal/DeleteBlogModal'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container, LoadingContainer } from '@/components/ui/container'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H1 } from '@/components/ui/typography'
import { getSingleBlog } from '@/lib/blog'
import { getMarkdownFromS3 } from '@/lib/blogFiles'
import { BUCKET_URL } from '@/shared/constants'
import { SupportedLocales, UserRoles } from '@/shared/types'

import type { Metadata } from 'next'

export const generateMetadata = async ({ params }: { params: Promise<{ blogId: string }> }): Promise<Metadata> => {
  const { blogId } = await params
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
      canonical: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/${locale}/blog/${blogId}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/en/blog/${blogId}`,
        uk: `${process.env.NEXT_PUBLIC_PRODUCTION_URL!}/uk/blog/${blogId}`
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

          {isAuthor && UserRoles.DOCTOR && (
            <div className='flex gap-2'>
              <StyledLinkButton variant='icon' href={`/blog/${blog?._id}/edit`}>
                <Pencil size={16} />
              </StyledLinkButton>
              <DeleteBlogModal blogId={blogId} />
            </div>
          )}
        </div>
      </PageHeading>
      <Suspense fallback={<LoadingContainer />}>
        <Container>
          <article className='markdown-body'>
            <Image
              src={`${BUCKET_URL}/custom/files/${blog.image}`}
              alt={blog.title[locale]}
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
