const router = require('express').Router();
const { facebookWebhook } = require('../controllers/webhookController');

router.post('/facebook', facebookWebhook);
router.get('/facebook', facebookWebhook);

module.exports = router;
