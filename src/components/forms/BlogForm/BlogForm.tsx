'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import MDEditor from '@uiw/react-md-editor'
import { Pencil, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { P } from '@/components/ui/typography'
import { useRouter } from '@/i18n/navigation'
import { createBlog, updateBlog } from '@/lib/blog'
import { saveFileToBucket } from '@/lib/bucket'
import { BUCKET_URL, SUPPORTED_LOCALES } from '@/shared/constants'
import { blogFormValuesSchema } from '@/shared/schemas'
import { Blog, BlogFormValues, CreateBlogFormDTO, EditBlogFormDTO, SupportedLocales } from '@/shared/types'
import { createMarkdownFile } from '@/utils/createMarkdownFile'
import { replaceSpacesWithUnderscores } from '@/utils/replaceSpacesWithUnderscores'
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
  const { data: session } = useSession()
  const router = useRouter()

  const { control, reset, handleSubmit, watch, setValue, getValues } = useForm<BlogFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(blogFormValuesSchema),
    defaultValues: {
      title: toLocalizedDefaults(blog?.title),
      description: toLocalizedDefaults(blog?.description),
      image: blog?.image ?? ''
    }
  })

  const onSubmit: SubmitHandler<BlogFormValues> = async (values) => {
    if (!session?.user.id) return

    if (isEditMode) {
      const descriptions: Record<SupportedLocales, string> = {
        en: '',
        uk: ''
      }

      for (const locale in values.description) {
        const file = createMarkdownFile(
          values.description[locale as SupportedLocales],
          replaceSpacesWithUnderscores(values.title[locale as SupportedLocales])
        )

        const bucketFileName = await saveFileToBucket(file, `blog_${file.name}_${locale}.md`, 'beclinic/custom/blog')

        descriptions[locale as SupportedLocales] = bucketFileName
      }

      const editBlog: EditBlogFormDTO = {
        ...values,
        _id: blog._id,
        description: descriptions,
        authorId: session?.user.id
      }

      const result = await updateBlog(blog._id, editBlog)

      if (result) {
        toast.success('notifications.blogUpdateSuccess')

        router.push(`/blog/${result._id}`)
      } else {
        toast.success('notifications.blogUpdateError')
      }
    } else {
      const descriptions: Record<SupportedLocales, string> = {
        en: '',
        uk: ''
      }

      for (const locale in values.description) {
        const file = createMarkdownFile(
          values.description[locale as SupportedLocales],
          replaceSpacesWithUnderscores(values.title[locale as SupportedLocales])
        )

        const bucketFileName = await saveFileToBucket(file, `blog_${file.name}_${locale}.md`, 'beclinic/custom/blog')

        descriptions[locale as SupportedLocales] = bucketFileName
      }

      const newBlog: CreateBlogFormDTO = {
        ...values,
        description: descriptions,
        authorId: session?.user.id
      }

      const result = await createBlog(newBlog)

      if (result) {
        toast.success('notifications.blogCreateSuccess')

        router.push(`/blog/${result._id}`)
      } else {
        toast.success('notifications.blogCreateError')
      }
    }
  }

  const handleUploadImage = async (file: File) => {
    const extension = file.name.split('.').pop()

    const fileName = await saveFileToBucket(file, `blog_${session?.user.id}.${extension}`, 'beclinic/custom/files')

    console.log('fileName', fileName)

    setValue('image', fileName)
  }

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      {SUPPORTED_LOCALES.map((locale) => (
        <Controller
          key={`title.${locale}`}
          name={`title.${locale}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='mb-4'>
              <Label htmlFor={`title.${locale}`}>{t('blogForm.blogTitle.label', { locale })}</Label>
              <Input
                type='text'
                id={`title.${locale}`}
                placeholder={t('blogForm.blogTitle.placeholder', { locale })}
                {...field}
              />
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
            <P className='font-medium mb-2'>{t('blogForm.image.label')}</P>

            <div className='relative h-[200px] w-[300px] rounded-sm bg-[#2a41e812] shadow-md flex items-center justify-center text-blue-200 mb-4'>
              {watch('image') ? (
                <Image
                  alt='Blog image'
                  width={300}
                  height={200}
                  className='w-full h-full rounded-sm object-cover'
                  src={`${BUCKET_URL}/custom/files/${getValues('image')}`}
                />
              ) : (
                <ImageIcon />
              )}

              <div className='flex items-center justify-center absolute right-[-25px] top-0'>
                <Pencil
                  size={16}
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
                  onClick={() => {
                    setValue('image', '')
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
              <Label htmlFor={`description.${locale}`}>{t('blogForm.blogDescription.label', { locale })}</Label>
              <div data-color-mode='light'>
                <MDEditor id={`description.${locale}`} height={200} {...field} />
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
