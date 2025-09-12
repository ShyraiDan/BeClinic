'use client'

import { DeleteBlogModal } from '@/components/modals/DeleteBlogModal/DeleteBlogModal'
export const DeleteBlogButton = () => {
  const handleDeleteBlog = () => {}

  return <DeleteBlogModal allowedAction={handleDeleteBlog} />
}
