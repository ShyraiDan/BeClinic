'use server'

import { auth } from '@/auth'
import connectMongoDB from '@/lib/mongodb'
import BlogModel from '@/shared/models/blog'
import { Blog, CreateBlogFormDTO, EditBlogFormDTO } from '@/shared/types'

export const getSingleBlog = async (blogId: string): Promise<Blog> => {
  try {
    await connectMongoDB()
    const blog = await BlogModel.findById(blogId).lean<Blog>()

    if (!blog) {
      throw new Error('No blog found')
    }

    return {
      ...blog,
      _id: blog._id.toString(),
      authorId: blog.authorId.toString()
    }
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Internal server error')
  }
}

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    await connectMongoDB()
    const blogs = await BlogModel.find().lean<Blog[]>()

    if (!blogs) {
      throw new Error('No blogs found')
    }

    return blogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
      authorId: blog.authorId.toString()
    }))
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Internal server error')
  }
}

export const createBlog = async (blogData: CreateBlogFormDTO): Promise<Blog> => {
  const session = await auth()

  if (session?.user.id !== blogData.authorId) {
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

    const newBlog = await BlogModel.findById(newBlogDoc._id).lean<Blog>()

    if (!newBlog) {
      throw new Error('Creating failed')
    }

    return {
      ...newBlog,
      _id: newBlog._id.toString(),
      authorId: newBlog.authorId.toString()
    }
  } catch (error) {
    console.error('Error: ', error)
    throw new Error('Unexpected error')
  }
}

export const updateBlog = async (blogId: string, blogData: EditBlogFormDTO): Promise<Blog> => {
  const session = await auth()

  if (!session || session.user.id !== blogData.authorId) {
    throw new Error('No access')
  }

  try {
    await connectMongoDB()

    const updBlog = await BlogModel.findOneAndUpdate(
      { _id: blogId },
      {
        ...blogData
      }
    ).lean<Blog>()

    if (!updBlog) {
      throw new Error('Updating blog failed')
    }

    return {
      ...updBlog,
      _id: updBlog._id.toString(),
      authorId: updBlog.authorId.toString()
    }
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
