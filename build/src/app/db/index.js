"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require("pg");

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src/usingDB/models/index.js
_dotenv2.default.config(); // allow connection pooling


var pool = new _pg.Pool({
  // pool connections to db together
  connectionString: process.env.DB_URL
});

exports.default = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params) // pass query to db. once completed, allow result to be called by controller
      .then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};