import mongoose, { Schema } from 'mongoose'

const FeaturedLinkSchema = new Schema({
  code: String,
  owner_id: Schema.Types.ObjectId,
  active: Boolean,
  sort: Number,
  initial_points: Number,
  current_bid: {
    user_id: Schema.Types.ObjectId,
    points: Number,
    created_at: Date
  },
  ends_at: Date,
  created_at: Date,
  updated_at: Date
}, {
  collection: 'featured_links',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

export default mongoose.models.FeaturedLinkSchema ?? mongoose.model('FeaturedLink', FeaturedLinkSchema)
