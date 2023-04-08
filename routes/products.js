const express = require('express');
const router = express.Router();
const {getMerchantProducts, addProduct, deleteProduct, updateProduct} = require('../controller/products');
const {authenticateUser} = require('../middleware/authorization');

// Product Router
router.get('/', authenticateUser, getMerchantProducts);
router.post('/', authenticateUser, addProduct);
router.delete('/:id', authenticateUser, deleteProduct);
router.put('/:id', authenticateUser, updateProduct);

module.exports = router;