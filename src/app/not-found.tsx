'use client'

import { useTranslations } from 'next-intl'

import { PageHeading } from '@/components/PageHeading/PageHeading'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H1, P } from '@/components/ui/typography'
import { useRouter } from '@/i18n/navigation'

export default function NotFoundPage() {
  const router = useRouter()

  const t = useTranslations('page')

  const handleRouterBack = () => {
    router.back()
  }

  return (
    <>
      <PageHeading title={t('notFound.title')} />
      <Container>
        <div className='max-w-[770px] mx-auto text-center'>
          <H1>{t('notFound.subtitle')}</H1>
          <div>
            <P className='my-3'>{t('notFound.description')}</P>

            <div className='flex justify-center items-center gap-4'>
              <StyledLinkButton href='/' className='bg-blue-600 text-white w-[135px]'>
                {t('notFound.button.toHero')}
              </StyledLinkButton>

              <Button
                onClick={handleRouterBack}
                variant='outline-blue'
                className='border-blue-600 text-blue-600 w-[135px]'>
                {t('notFound.button.back')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
