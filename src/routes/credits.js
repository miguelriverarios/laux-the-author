var express = require('express');
var router = express.Router();
var announcement = require('../middleware/announcement');

router.get('/', function(req, res, next) {

  const getResults = async function () {
    const results = await Promise.all([announcement()]);
    const a = results[0].values.reduce(function (prev, curr) {

      prev = curr[0] == "FALSE" ? false : curr[0];

      return prev;
    }, '');

    res.render('credits', { title: 'LAUX the Author', type: 'credits', announcement: a});
  }

  getResults();
  
});

module.exports = router;