const express = require('express');
const router = express.Router();

router.get('/list', require('./postlistGET'));
router.get('/:postId', require('./postGET'));
router.put('/:postId', require('./postPUT'));
router.delete('/:postId', require('./postDELETE'));
router.post('/post', require('./postPOST'));
module.exports = router;