const express = require('express');
const router = express.Router();
const {getMerchants, createMerchant, deleteMerchant} = require('../controllers/merchants');
const {authenticateUser} = require('../middleware/authorization');


// Merchant Router
router.get('/', getMerchants);
router.post('/', createMerchant);
router.delete('/:id', authenticateUser, deleteMerchant);

module.exports = router;