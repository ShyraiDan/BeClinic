'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import MDEditor from '@uiw/react-md-editor'
import { Pencil, Image as ImageIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SUPPORTED_LOCALES } from '@/shared/constants'
import { blogFormValuesSchema } from '@/shared/schemas'
import { Blog, BlogFormValues } from '@/shared/types'
import { toLocalizedDefaults } from '@/utils/toLocalizedDefaults'

interface BlogFormProps {
  blog?: Blog
}

// TODO: add validation

export const BlogForm = ({ blog }: BlogFormProps) => {
  const [isEditImage, setIsEditImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('forms')
  const isEditMode = !!blog?._id

  const { control, reset, handleSubmit, watch } = useForm<BlogFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(blogFormValuesSchema),
    defaultValues: {
      title: toLocalizedDefaults(blog?.title),
      description: toLocalizedDefaults(blog?.description),
      image: blog?.image ?? ''
    }
  })

  const onSubmit: SubmitHandler<BlogFormValues> = async (values) => {}

  const handleUploadImage = async (file: File) => {}

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      {SUPPORTED_LOCALES.map((locale) => (
        <Controller
          key={`title.${locale}`}
          name={`title.${locale}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('blogForm.blogTitle.label', { locale })}</Label>
              <Input placeholder={t('blogForm.blogTitle.placeholder', { locale })} {...field} />
              {error?.message && <ErrorText>{error.message}</ErrorText>}
            </div>
          )}
        />
      ))}

      <Controller
        name='image'
        control={control}
        render={({ fieldState: { error } }) => (
          <div className='flex mb-4 flex-col'>
            <Label>{t('blogForm.image.label')}</Label>

            <div className='relative h-[200px] w-[300px] rounded-sm bg-[#2a41e812] shadow-md flex items-center justify-center text-blue-200 mb-4'>
              {/* {watch('image') ? (
                <Image
                  alt=''
                  width={300}
                  height={200}
                  className='w-full h-full rounded-sm object-cover'
                  unoptimized
                  src=""
                />
              ) : (
                <ImageIcon className='dark:fill-grey-600' />
              )} */}
              <ImageIcon className='dark:fill-grey-600' />
              <div className='flex items-center justify-center absolute right-[-25px] top-0'>
                <Pencil
                  size={16}
                  className='dark:fill-grey-600'
                  onClick={() => {
                    setIsEditImage(true)
                  }}
                />
              </div>
            </div>
            {isEditImage && (
              <div className='flex items-center gap-3'>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }}>
                  {t('download')}
                </Button>
                <Button
                  variant='reset'
                  className='border-red-100 text-red-100 hover:border-red-700 hover:text-red-700'
                  onClick={() => {
                    setIsEditImage(false)
                  }}>
                  {t('cancel')}
                </Button>
                {watch('image') && (
                  <Button
                    className='bg-red-100 hover:bg-red-700'
                    onClick={() => {
                      setIsEditImage(false)
                    }}>
                    {t('delete')}
                  </Button>
                )}

                <input
                  ref={fileInputRef}
                  type='file'
                  name='file'
                  id='file'
                  accept='image/jpg, image/jpeg, image/png'
                  className='hidden'
                  onChange={(e) => {
                    if (!e.target.files) {
                      return
                    }
                    const file = e.target.files[0]
                    void handleUploadImage(file)
                  }}
                />
              </div>
            )}

            {error?.message && <ErrorText>{error.message}</ErrorText>}
          </div>
        )}
      />

      {SUPPORTED_LOCALES.map((locale) => (
        <Controller
          key={`description.${locale}`}
          name={`description.${locale}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label>{t('blogForm.blogDescription.label', { locale })}</Label>
              <div data-color-mode='light'>
                <MDEditor height={200} {...field} />
              </div>
              {error?.message && <ErrorText className='text-red text-sm my-1'>Блог має містити текст</ErrorText>}
            </div>
          )}
        />
      ))}

      <div className='flex gap-4'>
        <Button className='mt-5 w-full' type='submit'>
          {t(isEditMode ? 'update' : 'create')}
        </Button>

        <Button variant='reset' onClick={() => reset()} className='mt-5 w-full' type='reset'>
          {t('cancel')}
        </Button>
      </div>
    </form>
  )
}
