var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  let rawUrl = req.url;
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  let requestType = parsedQs.requestType ? parsedQs.requestType : '';

  res.render('contact-me', { title: 'LAUX the Author', type: 'about-me', requestType:  requestType});
});

module.exports = router;