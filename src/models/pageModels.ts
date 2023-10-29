import mongoose, { Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema
interface IPage {
  page_id: string
  name?: string
  content_id?: mongoose.Types.ObjectId[]
  user_id: ObjectId
}

const pageSchema: Schema<IPage> = new Schema({
  page_id: { type: String, required: true },
  name: { type: String, default: '' },
  content_id: [{ type: ObjectId, ref: 'Content' }],
  user_id: { type: ObjectId, required: true, ref: 'User' },
})

const PageModel: Model<IPage> =
  mongoose.models['Page'] || mongoose.model<IPage>('Page', pageSchema)

export { PageModel }
export type { IPage }
