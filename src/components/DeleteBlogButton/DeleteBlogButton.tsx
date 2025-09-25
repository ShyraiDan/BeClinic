'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { DeleteBlogModal } from '@/components/modals/DeleteBlogModal/DeleteBlogModal'
import { useRouter } from '@/i18n/navigation'
import { deleteBlog } from '@/lib/blog'

interface DeleteBlogButtonProps {
  blogId: string
}

export const DeleteBlogButton = ({ blogId }: DeleteBlogButtonProps) => {
  const router = useRouter()
  const t = useTranslations('page')

  const handleDeleteBlog = async () => {
    const result = await deleteBlog(blogId)

    if (result) {
      toast.success(t('blog.notifications.blogDeleteSuccess'))
      router.replace('/blog')
    } else {
      toast.error(t('blog.notifications.blogDeleteError'))
    }
  }

  return <DeleteBlogModal allowedAction={() => void handleDeleteBlog()} />
}
