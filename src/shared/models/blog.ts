import { InferSchemaType, Model, Schema, models, model } from 'mongoose'

const mongoBlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
