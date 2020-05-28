import moment from "moment"; // date formatting
import { v4 } from "uuid"; // generating unique id
import db from "../db"; // access to database functions

const Transaction = {
  /**
   * Create A Transaction
   * @param {object} req
   * @param {object} res
   * @returns {object} transaction object
   */
  async create(req, res) {
    // pass values from request body into new transaction
    const text = `INSERT INTO
      transactions(id, author_id, category, description, amount, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      v4(),
      req.user.id,
      req.body.category,
      req.body.description,
      req.body.amount,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(text, values); // pass query to db
      return res.status(201).send(rows[0]); // if successful return the new row
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Get All Transactions
   * @param {object} req
   * @param {object} res
   * @returns {object} transactions array
   */
  async getAll(req, res) {
    const findAllQuery = `SELECT * FROM transactions where author_id = $1`; // get all rows from transaction table containing the authorized user id
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]); // pass query to db
      return res.status(200).send({ rows, rowCount }); // if successful return all rows
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get One Transaction
   * @param {object} req
   * @param {object} res
   * @returns {object} transaction object
   */
  async getOne(req, res) {
    // get transaction of a given ID from table
    const text = `SELECT * FROM transactions WHERE id = $1 AND owner_id = $2`;
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "transaction not found" }); // if not found
      }
      return res.status(200).send(rows[0]); // if success, return the transaction row
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Update A Transaction
   * @param {object} req
   * @param {object} res
   * @returns {object} updated transaction
   */
  async update(req, res) {
    // get transaction of a given id, and pass in updated values from request body
    const findOneQuery = `SELECT * FROM transactions WHERE id=$1 AND owner_id = $2`; // find the transaction
    const updateOneQuery = `UPDATE transactions
      SET category=$1,description=$2,amount=$3,modified_date=$4
      WHERE id=$5 AND author_id = $6 returning *`; // pass request body values into transaction
    try {
      const { rows } = await db.query(findOneQuery, [
        req.params.id,
        req.user.id,
      ]); // run query to locate transaction
      if (!rows[0]) {
        return res.status(404).send({ message: "transaction not found" });
      }
      const values = [
        req.body.category || rows[0].category,
        req.body.description || rows[0].description,
        req.body.amount || rows[0].amount,
        moment(new Date()),
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
   * Delete A Transaction
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    // remove transaction of given id from table
    const deleteQuery = `DELETE FROM transactions WHERE id=$1 AND author_id=$2 returning *`;
    try {
      const { rows } = await db.query(deleteQuery, [
        req.params.id,
        req.user.id,
      ]); // find a given transaction, and delete
      if (!rows[0]) {
        return res.status(404).send({ message: "transaction not found" });
      }
      return res.status(204).send({ message: "deleted" });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default Transaction;

// notes: async required, since the db operation has to complete before we know its final result.
