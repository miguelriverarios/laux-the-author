const express = require('express');
const router = express.Router();
const contactMe = require('../controllers/contact-me');

router.get('/', contactMe);

module.exports = router;