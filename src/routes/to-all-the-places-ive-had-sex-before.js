const express = require('express');
const router = express.Router();
const toAllThePlacesIveHadSexBefore = require('../controllers/to-all-the-places-ive-had-sex-before');

router.get('/', toAllThePlacesIveHadSexBefore);

module.exports = router;