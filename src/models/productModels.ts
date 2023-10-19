import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema

interface IProduct extends Document {
  name: string
  description: string
  price: number
  purchasedCount: number
  license_id: ObjectId[]
}

const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  purchasedCount: { type: Number, required: true, default: 0 },
  license_id: [{ type: ObjectId, ref: 'License' }],
})

const ProductModel: Model<IProduct> =
  mongoose.models['Product'] ||
  mongoose.model<IProduct>('Product', productSchema)
export { ProductModel }
export type { IProduct }
