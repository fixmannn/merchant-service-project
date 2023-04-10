const db = require('../config/database');
const moment = require('moment');
const {hashPassword} = require('../utils/hash-password');

const getMerchantsModel = () => {
  const dataMerchants = db.any('SELECT * FROM merchants', [true]);
  return dataMerchants;
}

const createMerchantModel = (req) => {
  const hashedPassword = hashPassword(req.body.password);
  const createNewMerchant = db.none(`INSERT INTO merchants 
  (id, password, name, address, join_date, phone_number) 
  VALUES ($1, $2, $3, $4, $5, $6)`, 
  [req.body.id, 
    hashedPassword, 
    req.body.name, 
    req.body.address, 
    moment().format("YYYY-MM-DD HH:mm:ss"), 
    req.body.phone_number]);

  return createNewMerchant;
}

const deleteMerchantModel = (req) => {
  const deleteMerchant = db.none(`DELETE FROM merchants WHERE id = $1`, [req.params.id]);
  return deleteMerchant;
}

module.exports = {getMerchantsModel, createMerchantModel, deleteMerchantModel}
