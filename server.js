import express from "express";
import dotenv from "dotenv";
import "babel-polyfill"; // allow node to utilize async and Promise features from ES6
import Transaction from "./src/app/controllers/Transaction"; // methods affecting postgres db
import User from "./src/app/controllers/User";
import Auth from "./src/app/middleware/Auth";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express(); // new express instance

app.use(express.urlencoded({ extended: false })); // allow access to req.body
app.use(express.json()); // allow requests to be parsed as JSON
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
); // allow access to only our react app. need to change origin in production, localhost only for testing
app.use(cookieParser()); // allows access to cookies to retrieve token

// transaction routes
app.post("/api/v1/transactions", Auth.verifyToken, Transaction.create);
app.get("/api/v1/transactions/all", Auth.verifyToken, Transaction.getAll);
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
