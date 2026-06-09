const router = require('express').Router();
const { createTeam, addMember } = require('../controllers/teamController');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');

router.post('/team', auth, checkRole(['admin']), createTeam);
router.post('/team/add-member', auth, checkRole(['admin']), addMember);

module.exports = router;
