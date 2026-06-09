const router = require('express').Router();
const { getConversations, getMessages, sendReply, assignConversation } = require('../controllers/inboxController');
const auth = require('../middleware/auth');

router.get('/conversations', auth, getConversations);
router.get('/messages/:conversationId', auth, getMessages);
router.post('/reply', auth, sendReply);
router.post('/assign', auth, assignConversation);

module.exports = router;
