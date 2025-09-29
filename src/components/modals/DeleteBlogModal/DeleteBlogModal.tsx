'use client'

import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { P } from '@/components/ui/typography'
import { useRouter } from '@/i18n/navigation'
import { deleteBlog } from '@/lib/blog'

interface DeleteBlogModalProps {
  blogId: string
}

export const DeleteBlogModal = ({ blogId }: DeleteBlogModalProps) => {
  const t = useTranslations('modals')
  const router = useRouter()

  const handleDeleteBlog = async () => {
    const result = await deleteBlog(blogId)

    if (result) {
      toast.success(t('deleteBlog.notifications.blogDeleteSuccess'))
      router.replace('/blog?page=1')
    } else {
      toast.error(t('deleteBlog.notifications.blogDeleteError'))
    }
  }

  return (
    <StyledModal
      triggerButton={
        <Button className='text-white' type='button' variant='icon'>
          <Trash size={16} />
        </Button>
      }>
      <DialogHeader>
        <DialogTitle>{t('deleteBlog.title')}</DialogTitle>
      </DialogHeader>
      <P>{t('deleteBlog.reallyDelete')}</P>
      <div className='flex w-full justify-between gap-4 mt-4'>
        <Button type='button' className='w-full' onClick={() => void handleDeleteBlog()}>
          {t('deleteBlog.delete')}
        </Button>
        <DialogClose asChild>
          <Button type='button' className='w-full' variant='reset'>
            {t('deleteBlog.cancel')}
          </Button>
        </DialogClose>
      </div>
    </StyledModal>
  )
}
