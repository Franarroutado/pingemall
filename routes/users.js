var express = require('express');
var router = express.Router();
var ping = require('ping');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Executed!');
});

module.exports = router;
