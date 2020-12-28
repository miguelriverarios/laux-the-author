const express = require('express');
const router = express.Router();
const main = require('../controllers/index');

router.get(['/', '/index.html.var'], main);

module.exports = router;
