const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  platforms: [String],
  content: String,
  mediaUrls: [String],
  status: { type: String, enum: ['draft', 'published', 'failed'], default: 'draft' },
  publishedAt: Date,
  platformPostIds: mongoose.Schema.Types.Mixed,
  analytics: {
    likes: Number,
    comments: Number,
    shares: Number,
    reach: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
