"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require("uuid");

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // date formatting
// generating unique id


// access to database functions

var Transaction = {
  /**
   * Create A Transaction
   * @param {object} req
   * @param {object} res
   * @returns {object} transaction object
   */
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var text, values, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // pass values from request body into new transaction
              text = "INSERT INTO\n      transactions(id, author_id, category, description, amount, created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7)\n      returning *";
              values = [(0, _uuid.v4)(), req.user.id, req.body.category, req.body.description, req.body.amount, (0, _moment2.default)(new Date()), (0, _moment2.default)(new Date())];
              _context.prev = 2;
              _context.next = 5;
              return _db2.default.query(text, values);

            case 5:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              return _context.abrupt("return", res.status(201).send(rows[0]));

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 10]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),


  /**
   * Get All Transactions
   * @param {object} req
   * @param {object} res
   * @returns {object} transactions array
   */
  getAll: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var findAllQuery, _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findAllQuery = "SELECT * FROM transactions where author_id = $1"; // get all rows from transaction table containing the authorized user id

              _context2.prev = 1;
              _context2.next = 4;
              return _db2.default.query(findAllQuery, [req.user.id]);

            case 4:
              _ref4 = _context2.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;
              return _context2.abrupt("return", res.status(200).send({ rows: rows, rowCount: rowCount }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 10]]);
    }));

    function getAll(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return getAll;
  }(),

  /**
   * Get One Transaction
   * @param {object} req
   * @param {object} res
   * @returns {object} transaction object
   */
  getOne: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var text, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // get transaction of a given ID from table
              text = "SELECT * FROM transactions WHERE id = $1 AND owner_id = $2";
              _context3.prev = 1;
              _context3.next = 4;
              return _db2.default.query(text, [req.params.id, req.user.id]);

            case 4:
              _ref6 = _context3.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({ message: "transaction not found" }));

            case 8:
              return _context3.abrupt("return", res.status(200).send(rows[0]));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 11]]);
    }));

    function getOne(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return getOne;
  }(),

  /**
   * Update A Transaction
   * @param {object} req
   * @param {object} res
   * @returns {object} updated transaction
   */
  update: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var findOneQuery, updateOneQuery, _ref8, rows, values, response;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // get transaction of a given id, and pass in updated values from request body
              findOneQuery = "SELECT * FROM transactions WHERE id=$1 AND owner_id = $2"; // find the transaction

              updateOneQuery = "UPDATE transactions\n      SET category=$1,description=$2,amount=$3,modified_date=$4\n      WHERE id=$5 AND author_id = $6 returning *"; // pass request body values into transaction

              _context4.prev = 2;
              _context4.next = 5;
              return _db2.default.query(findOneQuery, [req.params.id, req.user.id]);

            case 5:
              _ref8 = _context4.sent;
              rows = _ref8.rows;

              if (rows[0]) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({ message: "transaction not found" }));

            case 9:
              values = [req.body.category || rows[0].category, req.body.description || rows[0].description, req.body.amount || rows[0].amount, (0, _moment2.default)(new Date()), req.params.id, req.user.id];
              _context4.next = 12;
              return _db2.default.query(updateOneQuery, values);

            case 12:
              response = _context4.sent;
              return _context4.abrupt("return", res.status(200).send(response.rows[0]));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](2);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[2, 16]]);
    }));

    function update(_x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return update;
  }(),


  /**
   * Delete A Transaction
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  delete: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var deleteQuery, _ref10, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              // remove transaction of given id from table
              deleteQuery = "DELETE FROM transactions WHERE id=$1 AND author_id=$2 returning *";
              _context5.prev = 1;
              _context5.next = 4;
              return _db2.default.query(deleteQuery, [req.params.id, req.user.id]);

            case 4:
              _ref10 = _context5.sent;
              rows = _ref10.rows;

              if (rows[0]) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({ message: "transaction not found" }));

            case 8:
              return _context5.abrupt("return", res.status(204).send({ message: "deleted" }));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 11]]);
    }));

    function _delete(_x9, _x10) {
      return _ref9.apply(this, arguments);
    }

    return _delete;
  }()
};

exports.default = Transaction;

// notes: async required, since the db operation has to complete before we know its final result.