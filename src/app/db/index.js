// src/usingDB/models/index.js
import { Pool } from "pg"; // allow connection pooling
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  // pool connections to db together
  connectionString: process.env.DB_URL,
});

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
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
