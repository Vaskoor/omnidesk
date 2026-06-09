const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  platformMessageId: String,
  direction: { type: String, enum: ['inbound', 'outbound'] },
  content: String,
  attachments: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
