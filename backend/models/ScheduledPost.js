const mongoose = require('mongoose');

const ScheduledPostSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  scheduledFor: Date,
  executed: { type: Boolean, default: false }
});

module.exports = mongoose.model('ScheduledPost', ScheduledPostSchema);
