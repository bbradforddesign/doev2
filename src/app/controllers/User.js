import moment from "moment"; // date formatting
import { v4 } from "uuid"; // generating unique id
import db from "../db"; // access to database functions
import Helper from "./Helper"; // auth helper functions

const User = {
  /**
   * Create User
   * @param {object} req
   * @param {object} res
   * @returns {object} transaction object
   */
  async create(req, res) {
    // accepts request body, validates, creates new entry in User table with request body fields, then send new JWT
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const hashPassword = Helper.hashPassword(req.body.password); // create a hash of user's entered password for security purposes
    const createQuery = `INSERT INTO
            users(id, username, password, created_date, modified_date)
            VALUES($1, $2, $3, $4, $5)
            returning *`;
    const values = [
      v4(),
      req.body.username,
      hashPassword,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      res.cookie("token", token, { httpOnly: true });
      return res.status(201).send({ token });
    } catch (error) {
      if (error.routine === "_bt_check_unique") {
        return res.status(400).send({ message: "Username already registered" });
      }
      return res.status(400).send(error);
    }
  },

  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async login(req, res) {
    // checks request body for required credentials, searches db for match. If match, generate new JWT
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: "All fields are required" }); // check that both username and password are supplied
    }
    const text = `SELECT * FROM users WHERE username = $1`; // query to find user of given username in db
    try {
      const { rows } = await db.query(text, [req.body.username]); // run query, passing in provided username
      if (!rows[0]) {
        return res.status(400).send({ message: "Invalid credentials" });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        // compare provided password with stored hash
        return res.status(400).send({ message: "Invalid credentials" });
      }
      const token = Helper.generateToken(rows[0].id); // generate new JWT signed with matched user's id
      res.clearCookie("token");
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} returns status 200
   */
  async logout(req, res) {
    try {
      res.clearCookie("token");
      return res.status(200).send("Successfully logged out");
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Delete User
   * @param {object} req
   * @param {object} res
   * @returns {void} returns status 204
   */
  async delete(req, res) {
    // search db for user of given id from request body. If match, remove user from db
    const deleteQuery = `DELETE FROM users WHERE id=$1 returning *`;
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "user not found" });
      }
      return res.status(204).send({ message: "deleted" });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default User;
