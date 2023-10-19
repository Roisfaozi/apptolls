import mongoose, { Document, Model, Schema } from 'mongoose'

interface IProduct extends Document {
  name: string
  description: string
  price: number
  purchasedCount: number
}

const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  purchasedCount: { type: Number, required: true, default: 0 },
})

export const ProductModel: Model<IProduct> =
  mongoose.models['Product'] ||
  mongoose.model<IProduct>('Product', productSchema)

export type { IProduct }
