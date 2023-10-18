import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema
interface IPage extends Document {
  pageId: string
  contentId: ObjectId
  userId: ObjectId
}

const pageSchema: Schema<IPage> = new Schema({
  pageId: { type: String, required: true },
  contentId: [{ type: ObjectId, ref: 'Content' }],
  userId: { type: ObjectId, required: true, ref: 'User' },
})

const PageModel: Model<IPage> = mongoose.model<IPage>('Page', pageSchema)

export { PageModel }
export type { IPage }
