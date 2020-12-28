const express = require('express');
const router = express.Router();
const privacyPolicy = require('../controllers/privacy-policy');

router.get('/', privacyPolicy);

module.exports = router;