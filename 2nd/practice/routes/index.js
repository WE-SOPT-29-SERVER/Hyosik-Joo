// WE SOPT SERVER Seminar 2 - routes/index.js
// by HYOSITIVE
// 2021.10.14

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/api", require("./api"));

module.exports = router;
