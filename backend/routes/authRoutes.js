const router = require('express').Router();
const { register, login, connectPlatform } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/connect-platform', auth, connectPlatform);

router.get('/facebook', passport.authenticate('facebook', { scope: ['pages_messaging', 'pages_manage_posts'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => res.redirect(process.env.FRONTEND_URL));

module.exports = router;
