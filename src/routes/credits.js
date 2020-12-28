const express = require('express');
const router = express.Router();
const credits = require('../controllers/credits');

router.get('/', credits);

module.exports = router;