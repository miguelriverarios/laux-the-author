const express = require('express');
const router = express.Router();
const urbanGlossary = require('../controllers/urban-glossary');

router.get('/', urbanGlossary);

module.exports = router;