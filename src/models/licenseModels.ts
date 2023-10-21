import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema

interface ILicense extends Document {
  licenseKey: string
  product_id: ObjectId
  purchasedAt: string
  lastChecked: string
  user_id: ObjectId
}

const licenseSchema: Schema<ILicense> = new Schema({
  licenseKey: { type: String, required: true },
  product_id: { type: ObjectId, required: true, ref: 'Product' },
  purchasedAt: { type: String, required: true },
  lastChecked: { type: String, required: true },
  user_id: { type: ObjectId, required: true, ref: 'User' },
})

const LicenseModel: Model<ILicense> =
  mongoose.models['License'] ||
  mongoose.model<ILicense>('License', licenseSchema)

export { LicenseModel }
export type { ILicense }
