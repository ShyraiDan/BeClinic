import { InferSchemaType, Model, Schema, models, model } from 'mongoose'

import { SUPPORTED_LOCALES } from '@/shared/constants'

const mongoBlogSchema = new Schema({
  title: {
    type: SUPPORTED_LOCALES.map((locale) => ({
      [locale]: {
        type: String,
        required: true
      }
    }))
  },
  description: {
    type: SUPPORTED_LOCALES.map((locale) => ({
      [locale]: {
        type: String,
        required: true
      }
    }))
  },
  image: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctors',
    required: true
  }
})

type Blog = InferSchemaType<typeof mongoBlogSchema>

const BlogModel = (models.Blog as Model<Blog>) || model('Blog', mongoBlogSchema)
export default BlogModel
