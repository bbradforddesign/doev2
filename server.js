const express = require("express");
const dotenv = require("dotenv");

// controller imports
const Goal = require("./src/app/controllers/Goal");
const Transaction = require("./src/app/controllers/Transaction");
const User = require("./src/app/controllers/User");

// utility imports
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Auth = require("./src/app/middleware/Auth");
// use filesystem to serve up frontend
const path = require("path");

// security related imports
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

dotenv.config();
const app = express(); // new express instance

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);
app.enable("trust proxy");
app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      path: "/",
      sameSite: "none",
      secure: true,
    },
  })
);
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));
// allow access to req.body
app.use(bodyParser());
app.use(express.json()); // allow requests to be parsed as JSON
app.use(cookieParser()); // allows access to cookies to retrieve token

// goal routes
app.post("/api/v1/goals", Auth.verifyToken, Goal.create);
app.get("/api/v1/goals/all", Auth.verifyToken, Goal.getAll);
app.post("/api/v1/goals/:id", Auth.verifyToken, Goal.getOne);
app.put("/api/v1/goals/:id", Auth.verifyToken, Goal.update);
app.delete("/api/v1/goals/:id", Auth.verifyToken, Goal.delete);
// transaction routes
app.post("/api/v1/transactions", Auth.verifyToken, Transaction.create);
app.get("/api/v1/transactions/all", Auth.verifyToken, Transaction.getAll);
app.post("/api/v1/transactions/range", Auth.verifyToken, Transaction.getRange);
app.post("/api/v1/transactions/:id", Auth.verifyToken, Transaction.getOne);
app.put("/api/v1/transactions/:id", Auth.verifyToken, Transaction.update);
app.delete("/api/v1/transactions/:id", Auth.verifyToken, Transaction.delete);
// user routes
app.post("/api/v1/users", User.create);
app.post("/api/v1/users/login", User.login);
app.get("/api/v1/users/logout", User.logout);
app.delete("/api/v1/users/remove", Auth.verifyToken, User.delete);

// test route
app.get("/api/v1", (req, res) => {
  res.send("Hello, API!");
});

// !ensure frontend exists at this location!
app.use(express.static(path.join(__dirname, "client/build")));

// route to serve frontend (all addresses not defined above)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 5000);
console.log("app is running on port ", 5000);
