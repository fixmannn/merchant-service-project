const db = require('../config/database');
const auth = require('basic-auth');
const {addProductsModel, deleteSpesificProductModel, updateSpesificProductModel, getListProductsModel} = require('../models/products');


// Add new product
const addProduct = async (req,res) => {
  try {
    // Validate request body
    if (!(Object.keys(req.body).length == 3 && 'name' in req.body && 'quantity' in req.body && 'price' in req.body)) return res.status(400).send('Body should only has name, quantity, and price');
  
    const data = await addProductsModel(req);
    res.status(201).json({message:'New product has successfully added'});
  } catch (err) {
    res.status(500).send(err.message);
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
    const data = await deleteSpesificProductModel(req);
    res.json({message: `Product has successfully deleted`});
  } catch (err) {
    res.status(500).send(err.message);
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

    const data = await updateSpesificProductModel(req);
    res.send({
      message: `Product ${req.body.name} has successfully updated`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const getMerchantProducts = async (req, res) => {
  try {
    const data = await getListProductsModel(req);
    // Send the message if there is no products
    if (data.length === 0) return res.status(404).send('You have no product yet, try to add a new one!');

    res.json({
      message: 'Get products success',
      data: data
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {addProduct, deleteProduct, updateProduct, getMerchantProducts};