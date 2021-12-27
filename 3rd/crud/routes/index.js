var express = require('express');
var router = express.Router();

router.use("/user", require("./user"));
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
router.use("/post", require("./post"));

module.exports = router;
