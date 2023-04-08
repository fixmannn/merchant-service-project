const db = require('../config/database');
const auth = require('basic-auth');


// Add new product
const addProduct = async (req,res) => {
  const user = auth(req);
  try {
    await db.none('INSERT INTO products (name, quantity, price, merchant_id) VALUES($1, $2, $3, $4)', 
    [req.body.name, req.body.quantity, req.body.price, user.name]);

    // Validate request body
    if (!(Object.keys(req.body).length == 3 && 'name' in req.body && 'quantity' in req.body && 'price' in req.body)) return res.status(400).send('Body should only has name, quantity, and price');

    res.status(201).send('New product has successfully added');
  } catch (err) {
    res.send(err.message);
  }
}

const deleteProduct = async (req, res) => {
  const user = auth(req);
  const productExist = await db.manyOrNone('SELECT id FROM products WHERE merchant_id = $1 AND id = $2', 
  [user.name, req.params.id]);

  try {
    if(!productExist || productExist.length === 0) {
      return res.status(404).send(`Sorry, the product is not found on this merchant`);
    }

    // Delete the product if product exist
    db.none(`DELETE FROM products WHERE merchant_id = $1 AND id = $2`, [user.name, req.params.id]);
    res.send(`Product has successfully deleted`);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

const updateProduct = async (req, res) => {
  const user = auth(req);
  const productExist = await db.oneOrNone('SELECT name FROM products WHERE merchant_id = $1 AND id = $2', 
  [user.name, req.params.id]);

  try {
    if(!productExist) {
      return res.status(404).send(`Can't update product, the product is not found on this merchant`);
    }

    await db.none(`
    UPDATE products SET
      name = $1,
      quantity = $2,
      price = $3
    WHERE merchant_id = $4 AND id = $5`, [req.body.name, req.body.quantity, req.body.price, user.name, req.params.id]);
    res.send(`Product ${req.body.name} has successfully updated`);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

const getMerchantProducts = async (req, res) => {
  const user = auth(req);
  try {
    const products = await db.manyOrNone('SELECT * FROM products WHERE merchant_id = $1', [user.name]);
    if (products.length === 0) return res.send('You have no product yet, try to add a new one!');

    res.send(products);
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {addProduct, deleteProduct, updateProduct, getMerchantProducts};