const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const Contact = require('../models/Contact');
const { getIo } = require('../socket/socketManager');

class WebhookHandler {
  async handleFacebookMessage(senderId, recipientId, messageText, timestamp) {
    let contact = await Contact.findOne({ platformContactId: senderId, platform: 'facebook' });
    if (!contact) {
      contact = new Contact({ platform: 'facebook', platformContactId: senderId, name: `User_${senderId}` });
      await contact.save();
    }
    let conversation = await Conversation.findOne({ platformConversationId: senderId, platform: 'facebook' });
    if (!conversation) {
      conversation = new Conversation({
        platform: 'facebook',
        platformConversationId: senderId,
        contactId: contact._id,
        lastMessageAt: new Date(timestamp)
      });
      await conversation.save();
    }
    const message = new Message({
      conversationId: conversation._id,
      platformMessageId: `msg_${timestamp}`,
      direction: 'inbound',
      content: messageText,
      createdAt: new Date(timestamp)
    });
    await message.save();
    conversation.lastMessageAt = new Date(timestamp);
    await conversation.save();

    const io = getIo();
    io.to(`conversation_${conversation._id}`).emit('new_message', message);
    io.emit('inbox_update', { conversationId: conversation._id });
  }
}

module.exports = new WebhookHandler();
