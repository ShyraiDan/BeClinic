import { useTranslations } from 'next-intl'

import { BlogForm } from '@/components/forms/BlogForm/BlogForm'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Container } from '@/components/ui/container'

const EditBlogPage = () => {
  const t = useTranslations('page')

  return (
    <>
      <PageHeading title={t('editBlogPage.title')} />
      <Container>
        <BlogForm />
      </Container>
    </>
  )
}

export default EditBlogPage
