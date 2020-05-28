const { Pool } = require("pg");
const dotenv = require("dotenv"); // access env vars

dotenv.config();

const pool = new Pool({
  // connect to remote db, create new connection pool
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("connected to the db");
});

/**
 * Create Transaction Table
 */
const createTransactionTable = () => {
  const queryText =
    // create new table with model's values
    `CREATE TABLE IF NOT EXISTS
      transactions(
        id UUID PRIMARY KEY,
        author_id UUID NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        amount float(2) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
      )`; // use foreign key to link transactions to corresponding user. When user is deleted, delete their transactions

  pool
    .query(queryText) // use pool method to return promise. once finished, close pool
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    users(
      id UUID PRIMARY KEY,
      email VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      created_date TIMESTAMP,
      modified_date TIMESTAMP
    )`;

  pool
    .query(queryText)
    .then((res) => {
      consosle.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Transaction Table
 */
const dropTransactionTable = () => {
  const queryText = `DROP TABLE IF EXISTS transactions returning *`; // remove transaction table
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = `DROP TABLE IF EXISTS users returning *`; // remove user table
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createTransactionTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropTransactionTable();
};

pool.on("remove", () => {
  // when 'pool.remove' event emitted, exit node process
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  // allow methods to be accessed publically
  createTransactionTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropTransactionTable,
  dropAllTables,
};

require("make-runnable"); //  allow methods to be callable from terminal during development
