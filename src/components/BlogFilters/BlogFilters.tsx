import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { P } from '@/components/ui/typography'

interface BlogFiltersProps {
  length: number
}

export const BlogFilters = ({ length }: BlogFiltersProps) => {
  const t = useTranslations('page')

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center justify-center'>
          {length > 0 && <P className='font-light text-black-300'>{t('blog.findPosts', { count: length })}</P>}
        </div>
        <div className='flex gap-4'>
          <StyledLinkButton href='/blog/add' variant='icon' className='p-2.5 bg-blue-300'>
            <Plus fill='#fff' size={16} />
          </StyledLinkButton>
        </div>
      </div>
    </>
  )
}
