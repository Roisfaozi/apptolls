import mongoose, { Model, Schema } from 'mongoose'

interface IImage {
  imageUrl: string
}

const ImageSchema: Schema<IImage> = new Schema({
  imageUrl: { type: String, required: true },
})

const ImageModel: Model<IImage> =
  mongoose.models['Image'] || mongoose.model<IImage>('Image', ImageSchema)
export { ImageModel }
export type { IImage }
