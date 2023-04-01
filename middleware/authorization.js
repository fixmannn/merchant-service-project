const auth = require('basic-auth');
const db = require('../config/database');
const bcrypt = require('bcrypt');

const authenticateUser = async (req, res, next) => {
  const user = auth(req);
  const dbAuthentication = await db.oneOrNone('SELECT id, password FROM merchants WHERE id = $1', [user.name]);
  const comparePass = bcrypt.compareSync(user.pass, dbAuthentication.password);
  

  if (comparePass) next();
  else res.status(401).send('Unauthorized User');
}

module.exports = {authenticateUser: authenticateUser};