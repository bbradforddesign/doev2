"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

require("babel-polyfill");

var _Goal = require("./src/app/controllers/Goal");

var _Goal2 = _interopRequireDefault(_Goal);

var _Transaction = require("./src/app/controllers/Transaction");

var _Transaction2 = _interopRequireDefault(_Transaction);

var _User = require("./src/app/controllers/User");

var _User2 = _interopRequireDefault(_User);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Auth = require("./src/app/middleware/Auth");

var _Auth2 = _interopRequireDefault(_Auth);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// utility imports
_dotenv2.default.config();

// security related imports
// allow node to utilize async and Promise features from ES6

// controller imports

var app = (0, _express2.default)(); // new express instance

// Middleware
app.enable("trust proxy");
app.use((0, _cors2.default)({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true
}));
app.use((0, _helmet2.default)());
app.use((0, _expressSession2.default)({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    path: "/",
    sameSite: "none",
    secure: true
  }
}));
app.set("trust proxy", 1);
app.use(_express2.default.urlencoded({ extended: false }));
// allow access to req.body
app.use((0, _bodyParser2.default)());
app.use(_express2.default.json()); // allow requests to be parsed as JSON
app.use((0, _cookieParser2.default)()); // allows access to cookies to retrieve token

// goal routes
app.post("/api/v1/goals", _Auth2.default.verifyToken, _Goal2.default.create);
app.get("/api/v1/goals/all", _Auth2.default.verifyToken, _Goal2.default.getAll);
app.post("/api/v1/goals/:id", _Auth2.default.verifyToken, _Goal2.default.getOne);
app.put("/api/v1/goals/:id", _Auth2.default.verifyToken, _Goal2.default.update);
app.delete("/api/v1/goals/:id", _Auth2.default.verifyToken, _Goal2.default.delete);
// transaction routes
app.post("/api/v1/transactions", _Auth2.default.verifyToken, _Transaction2.default.create);
app.get("/api/v1/transactions/all", _Auth2.default.verifyToken, _Transaction2.default.getAll);
app.post("/api/v1/transactions/range", _Auth2.default.verifyToken, _Transaction2.default.getRange);
app.post("/api/v1/transactions/:id", _Auth2.default.verifyToken, _Transaction2.default.getOne);
app.put("/api/v1/transactions/:id", _Auth2.default.verifyToken, _Transaction2.default.update);
app.delete("/api/v1/transactions/:id", _Auth2.default.verifyToken, _Transaction2.default.delete);
// user routes
app.post("/api/v1/users", _User2.default.create);
app.post("/api/v1/users/login", _User2.default.login);
app.get("/api/v1/users/logout", _User2.default.logout);
app.delete("/api/v1/users/remove", _Auth2.default.verifyToken, _User2.default.delete);

// test route
app.get("/api/v1", function (req, res) {
  res.send("Hello, API!");
});

app.listen(process.env.PORT || 3001);
console.log("app is running on port ", 3001);