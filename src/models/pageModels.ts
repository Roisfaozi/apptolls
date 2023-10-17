import mongoose, { Document, Model, Schema } from 'mongoose'

interface IPage extends Document {
  id: string
  pageId: string
  contentId: string
}

const pageSchema: Schema<IPage> = new Schema({
  id: { type: String, required: true, unique: true },
  pageId: { type: String, required: true },
  contentId: { type: String, required: true },
})

const PageModel: Model<IPage> = mongoose.model<IPage>('Page', pageSchema)

export { PageModel }
export type { IPage }
