import mongoose, { Model, ObjectId, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema

interface ICredentials {
  username: string
  password_cred: string
  user_id: ObjectId
}

const credentialsSchema: Schema<ICredentials> = new Schema({
  username: { type: String, required: true, unique: true },
  password_cred: { type: String, required: true },
  user_id: { type: ObjectId, required: true, ref: 'User' },
})

const CredentialsModel: Model<ICredentials> =
  mongoose.models['Credentials'] ||
  mongoose.model<ICredentials>('Credentials', credentialsSchema)

export { CredentialsModel }
export type { ICredentials }
