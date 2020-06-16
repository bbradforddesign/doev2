import moment from "moment"; // date formatting
import { v4 } from "uuid"; // generating unique id
import db from "../db"; // access to database functions

const Goal = {
  /**
   * Create A Goal
   * @param {object} req
   * @param {object} res
   * @returns {object} goal object
   */
  async create(req, res) {
    // pass values from request body into new goal
    const text = `INSERT INTO
        goals(id, author_id, description, categories, amount, start_date, end_date)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        returning *`;
    const values = [
      v4(),
      req.user.id,
      req.body.description,
      req.body.categories,
      req.body.amount,
      req.body.start,
      req.body.end,
    ];

    try {
      const { rows } = await db.query(text, values); // pass query to db
      return res.status(201).send(rows[0]); // if successful return the new row
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Get All Goals
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async getAll(req, res) {
    const findAllQuery = `SELECT * FROM goals where author_id = $1`;
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]); // pass query to db
      return res.status(200).send({ rows, rowCount }); // if successful return all rows
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get One goal
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async getOne(req, res) {
    // get goal of a given ID from table
    const text = `SELECT * FROM goals where id = $1 AND author_id= $2`;
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "goal not found" }); // if not found
      }
      return res.status(200).send(rows[0]); // if success, return the goal
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Update A goal
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  async update(req, res) {
    // get goal of a given id, and pass in updated values from request body
    const findOneQuery = `SELECT * FROM goals WHERE id=$1 AND author_id=$2`; // find the goal
    const updateOneQuery = `UPDATE goals
        SET description=$1,categories=$2,amount=$3,start_date=$4,end_date=$5
        WHERE id=$6 AND author_id=$7 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [
        req.params.id,
        req.user.id,
      ]); // run query to locate transaction
      if (!rows[0]) {
        return res.status(404).send({ message: "goal not found" });
      }
      const values = [
        req.body.description || rows[0].description,
        req.body.categories || rows[0].categories,
        req.body.amount || rows[0].amount,
        req.body.start || rows[0].start_date,
        req.body.end || rows[0].end_date,
        req.params.id,
        req.user.id,
      ];
      const response = await db.query(updateOneQuery, values); // if found, pass in values
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * Delete A Goal
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    // remove transaction of given id from table
    const deleteQuery = `DELETE FROM goals WHERE id=$1 AND author_id=$2 returning *`;
    try {
      const { rows } = await db.query(deleteQuery, [
        req.params.id,
        req.user.id,
      ]); // find a given transaction, and delete
      if (!rows[0]) {
        return res.status(404).send({ message: "goal not found" });
      }
      return res.status(204).send({ message: "deleted" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
};

export default Goal;
