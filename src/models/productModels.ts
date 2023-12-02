import mongoose, { Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema

interface IProduct {
  name: string
  description: string
  price: number
  purchasedCount: number
  license_id: ObjectId[]
  image_id: mongoose.Types.ObjectId[]
}

const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  purchasedCount: { type: Number, required: true, default: 0 },
  license_id: [{ type: ObjectId, ref: 'License' }],
  image_id: [{ type: ObjectId, ref: 'Image' }],
})

const ProductModel: Model<IProduct> =
  mongoose.models['Product'] ||
  mongoose.model<IProduct>('Product', productSchema)
export { ProductModel }
export type { IProduct }
