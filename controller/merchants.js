const db = require('../config/database');
const moment = require('moment');
const {validatePassword} = require('../middleware/password-validator');
const {hashPassword} = require('../utils/hash-password');
const auth = require('basic-auth');



// API Test to get all data
// const getMerchant = async (req, res) => {
//   try {
//     const merchant = await db.any('SELECT * FROM merchants', [true]);
//     res.send(merchant);
//   } catch (error) {
//     res.send(error.message);
//   }
// }

// Create merchant
const createMerchant = async (req, res) => {
  const hashedPassword = hashPassword(req.body.password);
  const passwordValid = validatePassword(req.body.password);
  const idExist = await db.oneOrNone('SELECT id FROM merchants WHERE id = $1', [req.body.id]);
  
  try {
    if(idExist) {
      return res.status(400).send(`id: ${req.body.id} already exist, try another one!`);
    }

    if (!passwordValid) {
      return res.status(400).send('Password invalid');
    }
    
    // if succeed create new merchant
    await db.none(`INSERT INTO merchants (id, password, name, address, join_date, phone_number) VALUES ($1, $2, $3, $4, $5, $6)`, [req.body.id, hashedPassword, req.body.name, req.body.address, moment().format("YYYY-MM-DD HH:mm:ss"), req.body.phone_number]);
    res.status(201).send('A user has been created');
  } catch (error) {
    res.status(400).send(error.message);
  } 
} 

// Delete merchant
const deleteMerchant = async (req, res) => {
  const idExist = await db.oneOrNone('SELECT id FROM merchants WHERE id = $1', [req.params.id]);
  const user = auth(req);
  try {
    // Send error message if id doesn't exist in the database
    if(!idExist) {
      return res.status(404).send(`id: ${req.params.id} does not exist`); 
    }

    if(req.params.id != user.name) {
      return res.status(400).send('Bad request, you don\'t have permission to perform this action');
    }

    // Delete if id match with database
    db.none(`DELETE FROM merchants WHERE id = $1`, [req.params.id]);
    res.send(`Id: ${req.params.id} succesfully deleted`);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


module.exports = {createMerchant, deleteMerchant};