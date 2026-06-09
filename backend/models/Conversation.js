const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  platformConversationId: String,
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  status: { type: String, enum: ['open', 'pending', 'closed'], default: 'open' },
  lastMessageAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
