"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

require("babel-polyfill");

var _Transaction = require("./src/app/controllers/Transaction");

var _Transaction2 = _interopRequireDefault(_Transaction);

var _User = require("./src/app/controllers/User");

var _User2 = _interopRequireDefault(_User);

var _Auth = require("./src/app/middleware/Auth");

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// methods affecting postgres db
_dotenv2.default.config(); // allow node to utilize async and Promise features from ES6

var app = (0, _express2.default)(); // new express instance

app.use(_express2.default.urlencoded({ extended: false })); // allow access to req.body
app.use(_express2.default.json()); // allow requests to be parsed as JSON

// transaction routes
app.post("/api/v1/transactions", _Auth2.default.verifyToken, _Transaction2.default.create);
app.get("/api/v1/transactions", _Auth2.default.verifyToken, _Transaction2.default.getAll);
app.get("/api/v1/transactions/:id", _Auth2.default.verifyToken, _Transaction2.default.getOne);
app.put("/api/v1/transactions/:id", _Auth2.default.verifyToken, _Transaction2.default.update);
app.delete("/api/v1/transactions/:id", _Auth2.default.verifyToken, _Transaction2.default.delete);
// user routes
app.post("/api/v1/users", _User2.default.create);
app.post("/api/v1/users/login", _User2.default.login);
app.delete("/api/v1/users/remove", _Auth2.default.verifyToken, _User2.default.delete);

app.listen(3000);
console.log("app is running on port ", 3000);