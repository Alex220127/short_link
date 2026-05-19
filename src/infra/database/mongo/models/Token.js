import mongoose, { Schema } from 'mongoose'

const TokenSchema = new Schema({
  scope: String,
  user_id: Schema.Types.ObjectId,
  expire_at: Date,
  device_id: String,
  permissions: [ String ]
}, {
  collection: 'tokens',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

TokenSchema.index({ user_id: 1 })
TokenSchema.index({ device_id: 1 })

export default mongoose.models.Token ?? mongoose.model('Token', TokenSchema)
