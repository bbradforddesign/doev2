"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  verifyToken: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decoded, text, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // get jwt from request body
              token = req.cookies.token;
              _context.prev = 1;
              _context.next = 4;
              return _jsonwebtoken2.default.verify(token, process.env.SECRET);

            case 4:
              decoded = _context.sent;
              // verify JWT
              text = "SELECT * FROM users WHERE id = $1";
              _context.next = 8;
              return _db2.default.query(text, [decoded.userId]);

            case 8:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(400).send({ message: "Invalid token" }));

            case 12:
              req.user = { id: decoded.userId }; // if success, pass along the validated user ID
              next();
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", res.status(400).send({ error: _context.t0, cookies: req.cookies }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 16]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return verifyToken;
  }()
};

exports.default = Auth;