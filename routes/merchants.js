const express = require('express');
const router = express.Router();
const {createMerchant, deleteMerchant} = require('../controller/merchants');
const {authenticateUser} = require('../middleware/authorization');

// Merchant Router
router.post('/', createMerchant);
router.delete('/:id', authenticateUser, deleteMerchant);

module.exports = router;