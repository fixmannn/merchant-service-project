const express = require('express');
const app = express();
app.use(express.json());


// Routes
const merchantRouter = require('./routes/merchants');
const productRouter = require('./routes/products');


app.use('/merchants', merchantRouter);
app.use('/products', productRouter);


// Server Port
app.listen(3000, () => {
  console.log('Server running on port 3000');
});