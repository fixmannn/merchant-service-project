const db = require('../config/database');
const auth = require('basic-auth');
const {validatePassword} = require('../middleware/password-validator');
const {getMerchantsModel, createMerchantModel, deleteMerchantModel} = require('../models/merchants');
const {deleteAllProductsModel} = require('../models/products');



// Get all data
const getMerchants = async(req, res) => {
  try {
    const data = await getMerchantsModel(); 
    res.json({
      message: "Get all merchants success",
      data: data
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Create merchant
const createMerchant = async (req, res) => {
  try {
    const passwordValid = validatePassword(req.body.password);
    const idExist = await db.oneOrNone('SELECT id FROM merchants WHERE id = $1', [req.body.id]);
    
    if(idExist) {
      return res.status(400).send(`id: ${req.body.id} already exist, try another one!`);
    }

    if (!passwordValid) {
      return res.status(400).send('Password invalid');
    }
    
    // if succeed create new merchant
    const data = createMerchantModel(req);    
    res.status(201).json({
      message: 'A user has been created'
    });
  } catch (error) {
    res.status(500).send(error.message);
  } 
} 

// Delete merchant
const deleteMerchant = async (req, res, next) => {
  try {
    const idExist = await db.oneOrNone('SELECT id FROM merchants WHERE id = $1', [req.params.id]);
    const user = auth(req);

    // Send error message if id doesn't exist in the database
    if(!idExist) {
      return res.status(404).send(`id: ${req.params.id} does not exist`); 
    }

    // Send error if the user logged in is not the same with the user in params
    if(req.params.id != user.name) {
      return res.status(400).send('Bad request, you don\'t have permission to perform this action');
    }

    // Delete if id match with database
    const productsOfMerchant = deleteAllProductsModel(req);
    await deleteMerchantModel(req);
    res.json({message: `Id: ${req.params.id} succesfully deleted`});
  } catch (error) {
    res.status(500).send(error.message);
  }
}


module.exports = {getMerchants, createMerchant, deleteMerchant};