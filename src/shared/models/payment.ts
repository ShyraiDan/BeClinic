import { InferSchemaType, Model, Schema, models, model } from 'mongoose'

const mongoPaymentSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointments',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    isPayed: {
      type: Boolean,
      required: true
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patients',
      required: true
    }
  },
  {
    timestamps: true
  }
)

type Payment = InferSchemaType<typeof mongoPaymentSchema>

const PaymentModel = (models.Payment as Model<Payment>) || model('Payment', mongoPaymentSchema)
export default PaymentModel
