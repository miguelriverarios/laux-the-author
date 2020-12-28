const express = require('express');
const router = express.Router();
const myTeam = require('../controllers/my-team');

router.get('/', myTeam);

module.exports = router;