const Post = require('../models/Post');
const Conversation = require('../models/Conversation');

exports.getDashboardStats = async (req, res) => {
  const totalPosts = await Post.countDocuments({ userId: req.user.id });
  const engagedConversations = await Conversation.countDocuments({ assignedTo: req.user.id, status: 'open' });
  res.json({ totalPosts, engagedConversations, totalReach: 12450 });
};
