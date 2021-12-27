const express = require('express');
const {checkUser} = require('../../../middlewares/auth');
const router = express.Router();

const uploadImage = require('../../../middlewares/uploadImage');

router.get('/list', require('./postlistGET'));
router.get('/:postId', checkUser, require('./postGET'));
router.put('/:postId', require('./postPUT'));
router.delete('/:postId', require('./postDELETE'));
router.post('/', uploadImage, require('./postPOST'));
module.exports = router;