const { Pool } = require("pg");
const dotenv = require("dotenv"); // access env vars

dotenv.config();

const pool = new Pool({
  // connect to remote db, create new connection pool
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("connected to the db");
});

/**
 * Create Goal Table
 */
const createGoalTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
    goals(
      id UUID PRIMARY KEY,
      author_id UUID NOT NULL,
      description TEXT NOT NULL,
      categories TEXT NOT NULL,
      amount float(2) NOT NULL,
      start_date TIMESTAMP,
      end_date TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
    )`;
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end;
    });
};

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
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Goal Table
 */
const dropGoalTable = () => {
  const queryText = `DROP TABLE IF EXISTS goals returning *`;
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
  createGoalTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropTransactionTable();
  dropGoalTable();
};

pool.on("remove", () => {
  // when 'pool.remove' event emitted, exit node process
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  // allow methods to be accessed publically
  createGoalTable,
  createTransactionTable,
  createUserTable,
  createAllTables,
  dropGoalTable,
  dropUserTable,
  dropTransactionTable,
  dropAllTables,
};

require("make-runnable"); //  allow methods to be callable from terminal during development
