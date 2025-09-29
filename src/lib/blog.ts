'use server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import BlogModel from '@/shared/models/blog'
import { blogSchema } from '@/shared/schemas'
import { Blog, CreateBlogFormDTO, EditBlogFormDTO, UserRoles } from '@/shared/types'

export const getSingleBlog = async (blogId: string): Promise<Blog> => {
  try {
    await connectMongoDB()
    const blog = await BlogModel.findById(blogId)
      .transform((docs) => {
        return {
          ...docs,
          _id: docs?._id.toString(),
          authorId: docs?.authorId.toString(),
          createdAt: docs?.createdAt?.toISOString(),
          updatedAt: docs?.updatedAt?.toISOString()
        }
      })
      .lean<Blog>()

    if (!blog) {
      throw new Error('No blog found')
    }

    return blogSchema.parse(blog)
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Internal server error')
  }
}

interface PaginatedBlogs {
  data: Blog[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const getBlogs = async (page = 1, pageSize = 10): Promise<PaginatedBlogs> => {
  const safePage = Math.max(1, Math.floor(page))
  const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize)))
  const skip = (safePage - 1) * safePageSize

  try {
    await connectMongoDB()
    const [total, docs] = await Promise.all([
      BlogModel.countDocuments(),
      BlogModel.find().sort({ createdAt: -1 }).skip(skip).limit(safePageSize).lean()
    ])

    const blogs = docs.map((d) => ({
      ...d,
      _id: d._id.toString(),
      authorId: d.authorId?.toString(),
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : undefined,
      updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : undefined
    }))

    if (!blogs) {
      throw new Error('No blogs found')
    }

    const totalPages = Math.max(1, Math.ceil(total / safePageSize))

    return {
      data: blogSchema.array().parse(blogs),
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages
    }
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Internal server error')
  }
}

export const createBlog = async (blogData: CreateBlogFormDTO): Promise<Blog> => {
  const session = await auth()

  if (session?.user.id !== blogData.authorId || session?.user.role !== UserRoles.DOCTOR) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const newBlogDoc = await BlogModel.create({
      ...blogData
    })

    if (!newBlogDoc) {
      throw new Error('Creating blog failed')
    }

    const newBlog = await BlogModel.findById(newBlogDoc._id)
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          authorId: doc?.authorId.toString(),
          createdAt: doc?.createdAt?.toISOString(),
          updatedAt: doc?.updatedAt?.toISOString()
        }
      })
      .lean<Blog>()

    if (!newBlog) {
      throw new Error('Creating blog failed')
    }

    return blogSchema.parse(newBlog)
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const updateBlog = async (blogId: string, blogData: EditBlogFormDTO): Promise<Blog> => {
  const session = await auth()

  if (session?.user.id !== blogData.authorId || session?.user.role !== UserRoles.DOCTOR) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const updBlog = await BlogModel.findOneAndUpdate(
      { _id: blogId },
      {
        $set: {
          title: blogData.title,
          description: blogData.description,
          image: blogData.image
        }
      },
      { new: true }
    )
      .transform((doc) => {
        return {
          ...doc,
          _id: doc?._id.toString(),
          authorId: doc?.authorId.toString(),
          createdAt: doc?.createdAt instanceof Date ? doc?.createdAt?.toISOString() : doc?.createdAt,
          updatedAt: doc?.updatedAt instanceof Date ? doc?.updatedAt?.toISOString() : doc?.updatedAt
        }
      })
      .lean<Blog>()

    if (!updBlog) {
      throw new Error('Updating blog failed')
    }

    return blogSchema.parse(updBlog)
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const deleteBlog = async (blogId: string): Promise<boolean> => {
  const session = await auth()

  if (!session) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const blog = await getSingleBlog(blogId)

    if (blog.authorId !== session.user.id) {
      throw new Error('No access')
    }

    await BlogModel.findByIdAndDelete(blogId)

    return true
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}
