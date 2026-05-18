import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  email: String,
  active: Boolean,
  profile: {
    type: String,
    enum: [ 'admin', 'user' ]
  },
  devices: [ String ],
  password: String,
  deleted_at: Date,
  last_event: String,
  suspended_until: Date
}, {
  collection: 'users',
  timestamps: true,
  versionKey: false
})

UserSchema.index({ email: 1 }, { unique: true })

export default mongoose.models.User ?? mongoose.model('User', UserSchema)
