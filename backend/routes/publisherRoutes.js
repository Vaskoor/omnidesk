const router = require('express').Router();
const { createPost, publishNow } = require('../controllers/publisherController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/create', auth, upload.array('media', 5), createPost);
router.post('/publish/:postId', auth, publishNow);

module.exports = router;
