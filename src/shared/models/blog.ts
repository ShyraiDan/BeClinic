import { InferSchemaType, Model, Schema, models, model } from 'mongoose'

import { SUPPORTED_LOCALES } from '@/shared/constants'

const localizedStringShape = SUPPORTED_LOCALES.reduce<Record<string, { type: StringConstructor; required: boolean }>>(
  (acc, loc) => {
    acc[loc] = { type: String, required: true }
    return acc
  },
  {}
)

const LocalizedStringSchema = new Schema(localizedStringShape, {
  _id: false,
  strict: 'throw'
})

const mongoBlogSchema = new Schema({
  title: { type: LocalizedStringSchema, required: true },
  description: { type: LocalizedStringSchema, required: true },
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
