const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  platform: String,
  platformContactId: String,
  name: String,
  avatar: String,
  profileUrl: String,
  aggregatedData: mongoose.Schema.Types.Mixed,
  lastInteraction: Date
});

module.exports = mongoose.model('Contact', ContactSchema);
