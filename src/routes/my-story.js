var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('my-story', { title: 'LAUX the Author', type: 'my-story' });
});

module.exports = router;