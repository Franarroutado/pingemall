var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', values: req.app.locals.pingResults });
});

router.get('/data', function(req, res, next) {
  res.send(req.app.locals.pingResults);
});

module.exports = router;
