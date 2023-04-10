const pgp = require('pg-promise')(/*options*/);
const ENV = require('dotenv').config();
const DB_LOCALHOST = ENV.parsed.LOCALHOST;
const DB_PORT = ENV.parsed.PORT;
const DB_NAME = ENV.parsed.DATABASE;
const DB_USER = ENV.parsed.USER;
const DB_PASSWORD = ENV.parsed.PASSWORD;

const cn = {
  host: DB_LOCALHOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD
};
// const db = pgp('postgres://postgres:postgresadmin@localhost:5432/merchant_service');
const db = pgp(cn);

module.exports = db;