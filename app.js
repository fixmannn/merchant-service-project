const express = require('express');
const app = express();


// Routes
const merchantRouter = require('./routes/merchants');
const productRouter = require('./routes/products');

app.get('/merchants', merchantRouter.getMerchant);
app.post('/merchants', merchantRouter.createMerchant);

// Server Port
app.listen(3000, () => {
  console.log('Server running on port 3000');
})
