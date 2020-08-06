import express from "express";
import dotenv from "dotenv";
import "babel-polyfill"; // allow node to utilize async and Promise features from ES6

// controller imports
import Goal from "./src/app/controllers/Goal";
import Transaction from "./src/app/controllers/Transaction";
import User from "./src/app/controllers/User";

// utility imports
import cookieParser from "cookie-parser";
import Auth from "./src/app/middleware/Auth";

// security related imports
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

dotenv.config();
const app = express(); // new express instance

// Middleware
app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(express.urlencoded({ extended: false })); // allow access to req.body
app.use(express.json()); // allow requests to be parsed as JSON
app.use(
  cors({
    origin: [process.env.ALLOWED_ORIGIN],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
); // allow access to only our react app. need to change origin in production, localhost only for testing
app.use(cookieParser()); // allows access to cookies to retrieve token

// goal routes
app.post("/api/v1/goals", Auth.verifyToken, Goal.create);
app.get("/api/v1/goals/all", Auth.verifyToken, Goal.getAll);
app.get("/api/v1/goals/:id", Auth.verifyToken, Goal.getOne);
app.put("/api/v1/goals/:id", Auth.verifyToken, Goal.update);
app.delete("/api/v1/goals/:id", Auth.verifyToken, Goal.delete);
// transaction routes
app.post("/api/v1/transactions", Auth.verifyToken, Transaction.create);
app.get("/api/v1/transactions/all", Auth.verifyToken, Transaction.getAll);
app.post("/api/v1/transactions/range", Auth.verifyToken, Transaction.getRange);
app.get("/api/v1/transactions/:id", Auth.verifyToken, Transaction.getOne);
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

app.listen(process.env.PORT || 3001);
console.log("app is running on port ", 3001);
