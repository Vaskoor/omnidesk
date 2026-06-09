const mongoose = require('mongoose');

const PlatformConnectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platform: { type: String, enum: ['facebook', 'instagram', 'tiktok', 'messenger'], required: true },
  platformUserId: String,
  accessToken: String,
  refreshToken: String,
  tokenExpiry: Date,
  pageId: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('PlatformConnection', PlatformConnectionSchema);
