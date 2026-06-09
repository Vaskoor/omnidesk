const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const FacebookService = require('../services/facebook');
const { getIo } = require('../socket/socketManager');

exports.getConversations = async (req, res) => {
  const conversations = await Conversation.find({ assignedTo: req.user.id }).populate('contactId');
  res.json(conversations);
};

exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const messages = await Message.find({ conversationId }).sort('createdAt');
  res.json(messages);
};

exports.sendReply = async (req, res) => {
  const { conversationId, content } = req.body;
  const conversation = await Conversation.findById(conversationId);
  const connection = await PlatformConnection.findOne({ userId: req.user.id, platform: conversation.platform });
  if (!connection) return res.status(400).json({ error: 'Platform not connected' });
  const fbService = new FacebookService(connection.accessToken);
  await fbService.sendMessage(conversation.platformConversationId, content);
  const message = new Message({
    conversationId,
    direction: 'outbound',
    content,
    createdAt: new Date()
  });
  await message.save();
  getIo().to(`conversation_${conversationId}`).emit('new_message', message);
  res.json(message);
};

exports.assignConversation = async (req, res) => {
  const { conversationId, agentId } = req.body;
  const conv = await Conversation.findByIdAndUpdate(conversationId, { assignedTo: agentId }, { new: true });
  res.json(conv);
};
