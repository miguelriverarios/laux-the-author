const express = require('express');
const router = express.Router();
const myStory = require('../controllers/my-story');

router.get('/', myStory);

module.exports = router;