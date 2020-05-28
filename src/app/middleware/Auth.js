import jwt from "jsonwebtoken";
import db from "../db";

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const token = req.headers["x-access-token"]; // get JWT from header
    if (!token) {
      return res.status(400).send({ message: "Token not provided" });
    }
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
      return res.status(400).send(error);
    }
  },
};

export default Auth;
