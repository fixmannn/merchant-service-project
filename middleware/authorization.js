const auth = require('basic-auth');
const db = require('../config/database');
const bcrypt = require('bcrypt');

const authenticateUser = async (req, res, next) => {
  const user = auth(req);

  // Check if there is basic auth 
  if (!req.get('Authorization') || !req.get('Authorization').includes('Basic')) {
    return res.status(401).send('Unauthorized action, you need to login first');
  }
  
  // Check if the user exist in database
  const dbAuthentication = await db.oneOrNone('SELECT id, password FROM merchants WHERE id = $1', [user.name]);
  if (!dbAuthentication) {
    return res.status(404).send('User not found');
  };
  
  // Check if username and password matched with database
  const comparePass = bcrypt.compareSync(user.pass, dbAuthentication.password);
  if (comparePass) next();
  else res.status(401).send('Wrong password, please try again!');
}

module.exports = {authenticateUser: authenticateUser};