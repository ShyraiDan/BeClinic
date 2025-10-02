import { HydratedDocument, InferSchemaType, Model, Schema, models, model } from 'mongoose'

import { Medicine } from '@/shared/types'

const mongoAppointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patients',
      required: true
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctors',
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    description: String,
    analyses: {
      type: [Schema.Types.ObjectId],
      ref: 'Analyses'
    },
    fileName: String,
    diagnosis: String,
    treatment: String,
    medicine: Array<Medicine>
  },
  {
    timestamps: true
  }
)

export type Appointment = InferSchemaType<typeof mongoAppointmentSchema>
export type AppointmentDoc = HydratedDocument<Appointment>

const AppointmentModel = (models.Appointments as Model<Appointment>) || model('Appointments', mongoAppointmentSchema)
export default AppointmentModel
