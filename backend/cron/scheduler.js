const cron = require('node-cron');
const ScheduledPost = require('../models/ScheduledPost');
const Post = require('../models/Post');

exports.initScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const due = await ScheduledPost.find({ scheduledFor: { $lte: now }, executed: false }).populate('postId');
    for (const schedule of due) {
      const post = schedule.postId;
      post.status = 'published';
      await post.save();
      schedule.executed = true;
      await schedule.save();
      console.log(`Published scheduled post ${post._id}`);
    }
  });
};
