"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require("uuid");

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

var _Helper = require("./Helper");

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // date formatting
// generating unique id
// access to database functions


// auth helper functions

var User = {
  /**
   * Create User
   * @param {object} req
   * @param {object} res
   * @returns {object} transaction object
   */
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, createQuery, values, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.username || !req.body.password)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({ message: "All fields are required" }));

            case 2:
              hashPassword = _Helper2.default.hashPassword(req.body.password); // create a hash of user's entered password for security purposes

              createQuery = "INSERT INTO\n            users(id, username, password, created_date, modified_date)\n            VALUES($1, $2, $3, $4, $5)\n            returning *";
              values = [(0, _uuid.v4)(), req.body.username, hashPassword, (0, _moment2.default)(new Date()), (0, _moment2.default)(new Date())];
              _context.prev = 5;
              _context.next = 8;
              return _db2.default.query(createQuery, values);

            case 8:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              token = _Helper2.default.generateToken(rows[0].id);

              res.cookie("token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true
              });
              return _context.abrupt("return", res.status(201).send({ token: token }));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](5);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 15]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),


  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  login: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref4, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.username || !req.body.password)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({ message: "All fields are required" }));

            case 2:
              text = "SELECT * FROM users WHERE username = $1"; // query to find user of given username in db

              _context2.prev = 3;
              _context2.next = 6;
              return _db2.default.query(text, [req.body.username]);

            case 6:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({ message: "Invalid credentials" }));

            case 10:
              if (_Helper2.default.comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({ message: "Invalid credentials" }));

            case 12:
              token = _Helper2.default.generateToken(rows[0].id); // generate new JWT signed with matched user's id

              res.cookie("token", token, {
                httpOnly: true
              });
              return _context2.abrupt("return", res.status(200).send({ token: token }));

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 17]]);
    }));

    function login(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }(),


  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} returns status 200
   */
  logout: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              res.clearCookie("token");
              return _context3.abrupt("return", res.status(200).send("Successfully logged out"));

            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 5]]);
    }));

    function logout(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return logout;
  }(),


  /**
   * Delete User
   * @param {object} req
   * @param {object} res
   * @returns {void} returns status 204
   */
  delete: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var deleteQuery, _ref7, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // search db for user of given id from request body. If match, remove user from db
              deleteQuery = "DELETE FROM users WHERE id=$1 returning *";
              _context4.prev = 1;
              _context4.next = 4;
              return _db2.default.query(deleteQuery, [req.user.id]);

            case 4:
              _ref7 = _context4.sent;
              rows = _ref7.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({ message: "user not found" }));

            case 8:
              return _context4.abrupt("return", res.status(204).send({ message: "deleted" }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 11]]);
    }));

    function _delete(_x7, _x8) {
      return _ref6.apply(this, arguments);
    }

    return _delete;
  }()
};

exports.default = User;