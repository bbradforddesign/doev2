const dotenv = require("dotenv"); // access env vars
const { Client } = require("pg");
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

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

  client
    .query(queryText) // use client method to return promise. once finished, close client
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
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

  client
    .query(queryText)
    .then((res) => {
      consosle.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
};

/**
 * Drop Transaction Table
 */
const dropTransactionTable = () => {
  const queryText = `DROP TABLE IF EXISTS transactions returning *`; // remove transaction table
  client
    .query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = `DROP TABLE IF EXISTS users returning *`; // remove user table
  client
    .query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
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

client.on("remove", () => {
  // when 'client.remove' event emitted, exit node process
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
