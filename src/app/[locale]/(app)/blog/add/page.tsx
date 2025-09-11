import { useTranslations } from 'next-intl'

import { BlogForm } from '@/components/forms/BlogForm/BlogForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'

const AddBlogPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('addBlogPage.title')} />
      <Container>
        <BlogForm />
      </Container>
    </>
  )
}

export default AddBlogPage
