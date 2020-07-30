var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
var announcement = require('../middleware/announcement');

/* GET home page. */
router.get('/', function(req, res, next) {
  let rawUrl = req.url;
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  let requestType = parsedQs.requestType ? parsedQs.requestType : '';

  const getResults = async function () {
    const results = await Promise.all([announcement()]);
    const a = results[0].values.reduce(function (prev, curr) {
      
      prev = curr[0] == "FALSE" ? false : curr[0];
      
      return prev;
    }, '');

    res.render('contact-me', { title: 'LAUX the Author', type: 'contact-me', requestType:  requestType, announcement: a});
  }

  getResults();
});

module.exports = router;