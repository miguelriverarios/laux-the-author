var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('credits', { title: 'LAUX the Author', type: 'credits'});
});

module.exports = router;