import mongoose, { Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema

interface IContent {
  title: string
  description: string
  isScheduled: boolean
  publishTime: string
  publishDate: string
  page_id: ObjectId
  user_id: ObjectId
}

const contentSchema: Schema<IContent> = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  isScheduled: { type: Boolean, required: true },
  publishTime: { type: String, required: true },
  publishDate: { type: String, required: true },
  page_id: { type: ObjectId, required: true, ref: 'Page' },
  user_id: { type: ObjectId, required: true, ref: 'User' },
})

const ContentModel: Model<IContent> =
  mongoose.models['Content'] ||
  mongoose.model<IContent>('Content', contentSchema)

export { ContentModel }
export type { IContent }
