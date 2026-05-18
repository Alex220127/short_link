import mongoose, { Schema } from 'mongoose'

const LinkSchema = new Schema({
  title: String,
  user_id: Schema.Types.ObjectId,
  blocked: Boolean,
  password: String,
  user_name: String,
  short_code: String,
  expires_at: Date,
  redirect_to: String,
  protected_by_password: Boolean
})

LinkSchema.index({ user_id: 1 })

export default mongoose.models.Link ?? mongoose.model('Link', LinkSchema)
