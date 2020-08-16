const pg = require("pg");
const dotenv = require("dotenv");

const Pool = pg.Pool;
dotenv.config();

const pool = new Pool({
  // pool connections to db together
  // NOTE: to connect to Heroku Postgres, must use process.env.DATABASE_URL
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params) // pass query to db. once completed, allow result to be called by controller
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
