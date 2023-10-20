import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema
interface IPage extends Document {
  page_id: string
  content_id: ObjectId
  user_id: ObjectId
}

const pageSchema: Schema<IPage> = new Schema({
  page_id: { type: String, required: true },
  content_id: [{ type: ObjectId, ref: 'Content' }],
  user_id: { type: ObjectId, required: true, ref: 'User' },
})

const PageModel: Model<IPage> = mongoose.model<IPage>('Page', pageSchema)

export { PageModel }
export type { IPage }
