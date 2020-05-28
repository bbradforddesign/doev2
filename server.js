import express from "express";
import dotenv from "dotenv";
import "babel-polyfill"; // allow node to utilize async and Promise features from ES6
import Transaction from "./src/app/controllers/Transaction"; // methods affecting postgres db
import User from "./src/app/controllers/User";
import Auth from "./src/app/middleware/Auth";

dotenv.config();
const app = express(); // new express instance

app.use(express.urlencoded({ extended: false })); // allow access to req.body
app.use(express.json()); // allow requests to be parsed as JSON

// transaction routes
app.post("/api/v1/transactions", Auth.verifyToken, Transaction.create);
app.get("/api/v1/transactions", Auth.verifyToken, Transaction.getAll);
app.get("/api/v1/transactions/:id", Auth.verifyToken, Transaction.getOne);
app.put("/api/v1/transactions/:id", Auth.verifyToken, Transaction.update);
app.delete("/api/v1/transactions/:id", Auth.verifyToken, Transaction.delete);
// user routes
app.post("/api/v1/users", User.create);
app.post("/api/v1/users/login", User.login);
app.delete("/api/v1/users/remove", Auth.verifyToken, User.delete);

app.listen(3000);
console.log("app is running on port ", 3000);
