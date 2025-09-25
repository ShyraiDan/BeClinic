import matter, { GrayMatterFile } from 'gray-matter'

import { BUCKET_URL } from '@/shared/constants'

export async function getMarkdownFromS3(filename: string): Promise<GrayMatterFile<string>> {
  const res = await fetch(`${BUCKET_URL}/custom/blog/${filename}`)
  if (!res.ok) throw new Error('Failed to fetch blog data')

  const blog = await res.text()

  const matterResult = matter(blog)

  return matterResult
}
