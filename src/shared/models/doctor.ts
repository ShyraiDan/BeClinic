import mongoose, { InferSchemaType, Model, Schema } from 'mongoose'

const mongoDoctorSchema = new Schema(
  {
    doctorName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    avatarUrl: String,
    description: String
  },
  {
    timestamps: true
  }
)

export type Doctor = InferSchemaType<typeof mongoDoctorSchema>

const DoctorModel = (mongoose.models.Doctors as Model<Doctor>) || mongoose.model('Doctors', mongoDoctorSchema)
export default DoctorModel
