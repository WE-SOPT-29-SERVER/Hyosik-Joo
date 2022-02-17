const express = require('express');
const router = express.Router();

router.get('/', require('./kakao'));
router.post('/verifyToken', require('./verifyToken'));

module.exports = router;

/*, 
* */