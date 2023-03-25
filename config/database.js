const pgp = require('pg-promise')(/*options*/);
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'merchant_service',
  user: 'postgres',
  password: 'postgresadmin'
};
// const db = pgp('postgres://postgres:postgresadmin@localhost:5432/merchant_service');
const db = pgp(cn);

module.exports = db;