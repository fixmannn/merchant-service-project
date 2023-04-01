const express = require('express');
const app = express();
app.use(express.json());
const {authenticateUser} = require('./middleware/authorization');


// Routes
const merchantRouter = require('./routes/merchants');
const productRouter = require('./routes/products');

// Merchant Router
app.get('/merchants', merchantRouter.getMerchant);
app.post('/merchants', merchantRouter.createMerchant);
app.delete('/merchants/:id', authenticateUser, merchantRouter.deleteMerchant);

// Product Router
app.get('/products', authenticateUser, productRouter.getMerchantProducts);
app.post('/products', authenticateUser, productRouter.addProduct);
app.delete('/products/:id', authenticateUser, productRouter. deleteProduct);
app.put('/products/:id', authenticateUser, productRouter.updateProduct);

// Server Port
app.listen(3000, () => {
  console.log('Server running on port 3000');
})