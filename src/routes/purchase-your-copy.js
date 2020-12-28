const express = require('express');
const router = express.Router();
const purchaseYourCopyPost = require('../controllers/purchase-your-copy-post');
const purchaseYourCopyGet = require('../controllers/purchase-your-copy-get');

router.get('/', purchaseYourCopyGet);
router.post('/checkout', purchaseYourCopyPost);

module.exports = router;