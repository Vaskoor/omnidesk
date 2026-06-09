const Post = require('../models/Post');
const ScheduledPost = require('../models/ScheduledPost');
const FacebookService = require('../services/facebook');
const InstagramService = require('../services/instagram');
const TikTokService = require('../services/tiktok');
const mediaTranscoder = require('../services/mediaTranscoder');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.createPost = async (req, res) => {
  const { content, platforms, scheduleFor } = req.body;
  let mediaUrls = [];
  if (req.files) {
    for (const file of req.files) {
      const transcoded = await mediaTranscoder.transcodeToPlatformFormat(platforms[0], file.path);
      mediaUrls.push(transcoded);
    }
  }
  const post = new Post({ userId: req.user.id, platforms, content, mediaUrls, status: 'draft' });
  await post.save();
  if (scheduleFor) {
    const scheduled = new ScheduledPost({ postId: post._id, scheduledFor: new Date(scheduleFor) });
    await scheduled.save();
  }
  res.json(post);
};

exports.publishNow = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  const results = {};
  for (const platform of post.platforms) {
    let service;
    if (platform === 'facebook') service = new FacebookService(req.user.facebookToken);
    if (platform === 'instagram') service = new InstagramService(req.user.instagramToken);
    if (platform === 'tiktok') service = new TikTokService(req.user.tiktokToken);
    const media = post.mediaUrls[0];
    const resp = await service.publishPost(post.content, media);
    results[platform] = resp.id;
  }
  post.status = 'published';
  post.publishedAt = new Date();
  post.platformPostIds = results;
  await post.save();
  res.json(post);
};
