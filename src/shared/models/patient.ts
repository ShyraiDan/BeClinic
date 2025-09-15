'use server'

import mongoose, { HydratedDocument, InferSchemaType, Model, Schema } from 'mongoose'

const mongoPatientSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    dateOfBirth: String,
    phoneNumber: String,
    bloodType: String,
    diabetes: String,
    rhFactor: String,
    bloodTransfusion: String,
    intoleranceToMedicines: String,
    infectiousDiseases: String,
    surgicalInterventions: String,
    allergies: String,
    image: String
  },
  {
    timestamps: true
  }
)

export type Patient = InferSchemaType<typeof mongoPatientSchema>
export type PatientDoc = HydratedDocument<Patient>

const PatientModel = (mongoose.models.Patients as Model<Patient>) || mongoose.model('Patients', mongoPatientSchema)
export default PatientModel
