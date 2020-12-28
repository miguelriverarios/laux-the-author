const express = require('express');
const router = express.Router();
const yourStories = require('../controllers/your-stories');

router.get('/', yourStories);

module.exports = router;