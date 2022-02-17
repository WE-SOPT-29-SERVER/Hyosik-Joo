const express = require('express');
const router = express.Router();

router.post('/signup', require('./authSignupPOST'));
router.post('/login/email', require('./authLoginEmailPOST'));
router.get('/google', require('./googleAuth'));

module.exports = router;