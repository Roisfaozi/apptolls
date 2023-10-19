import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema

interface ILicense extends Document {
  licenseKey: string
  productId: ObjectId
  purchasedAt: Date
  lastChecked: Date
  userId: ObjectId
}

const licenseSchema: Schema<ILicense> = new Schema({
  licenseKey: { type: String, required: true },
  productId: { type: ObjectId, required: true, ref: 'Product' },
  purchasedAt: { type: Date, required: true },
  lastChecked: { type: Date, required: true },
  userId: { type: ObjectId, required: true, ref: 'User' },
})

const LicenseModel: Model<ILicense> = mongoose.model<ILicense>(
  'License',
  licenseSchema
)

export { LicenseModel }
export type { ILicense }
