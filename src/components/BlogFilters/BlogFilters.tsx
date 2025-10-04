import { Plus } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { P } from '@/components/ui/typography'
import { UserRoles } from '@/shared/types'

interface BlogFiltersProps {
  length: number
}

export const BlogFilters = async ({ length }: BlogFiltersProps) => {
  const t = await getTranslations('page')
  const session = await auth()

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center justify-center'>
          {length > 0 && <P className='font-light text-black-300'>{t('blog.findPosts', { count: length })}</P>}
        </div>
        <div className='flex gap-4'>
          {session?.user.role === UserRoles.DOCTOR && (
            <StyledLinkButton href='/blog/add' variant='icon' className='p-2.5 bg-blue-300'>
              <Plus fill='#fff' size={16} />
            </StyledLinkButton>
          )}
        </div>
      </div>
    </>
  )
}
