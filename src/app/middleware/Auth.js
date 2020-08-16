const jwt = require("jsonwebtoken");
const db = require("../db");

exports.verifyToken = async (req, res, next) => {
  // get jwt from request body
  const token = req.cookies.token;
  try {
    const decoded = await jwt.verify(token, process.env.SECRET); // verify JWT
    const text = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await db.query(text, [decoded.userId]); // once verified, query db for the decoded user ID
    if (!rows[0]) {
      return res.status(400).send({ message: "Invalid token" });
    }
    req.user = { id: decoded.userId }; // if success, pass along the validated user ID
    next();
  } catch (error) {
    return res.status(400).send({ error: error, cookies: req.cookies });
  }
};
