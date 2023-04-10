const db = require('../config/database');
const auth = require('basic-auth');


const addProductsModel = (req) => {
  const user = auth(req);
  const getProducts = db.none('INSERT INTO products (name, quantity, price, merchant_id) VALUES($1, $2, $3, $4)', 
  [req.body.name, req.body.quantity, req.body.price, user.name]);
  return getProducts;
}

const deleteSpesificProductModel = (req) => {
  const user = auth(req);
  const deleteProduct = db.none(`DELETE FROM products WHERE merchant_id = $1 AND id = $2`, [user.name, req.params.id]);
  return deleteProduct;
}

const deleteAllProductsModel = (req) => {
  const deleteAllProducts = db.none(`DELETE FROM products WHERE merchant_id = $1`, [req.params.id]);
  return deleteAllProducts;
}

const updateSpesificProductModel = (req) => {
  const user = auth(req);
  const updateProduct = db.none(`
  UPDATE products SET
  name = $1,
  quantity = $2,
  price = $3
  WHERE merchant_id = $4 AND id = $5`, 
  [req.body.name, req.body.quantity, req.body.price, user.name, req.params.id]);
  return updateProduct;
}

const getListProductsModel = (req) => {
  const user = auth(req);
  const listProducts = db.manyOrNone('SELECT * FROM products WHERE merchant_id = $1', [user.name]);
  return listProducts;
}

module.exports = {deleteAllProductsModel, addProductsModel, deleteSpesificProductModel, updateSpesificProductModel, getListProductsModel};