const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/scrap', require('./scrap'));
//router.use('/kakaoAuth', require('./kakaoAuth'));
module.exports = router;