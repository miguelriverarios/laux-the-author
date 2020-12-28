const express = require('express');
const router = express.Router();
const myMedia = require('../controllers/my-media');

router.get('/', myMedia);

module.exports = router;