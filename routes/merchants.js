const db = require('../config/database');


async function getMerchant(req, res) {
  try {
    const merchant = db.any('SELECT * FROM merchants', [true]);
    res.send(await merchant);
  } catch (error) {
    res.send(error);
  }
}

const createMerchant = (req, res) => {
  res.send('creating merchant');
}


module.exports = {getMerchant, createMerchant};