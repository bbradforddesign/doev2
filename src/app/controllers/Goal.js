const db = require("../db");
const uuid = require("uuid");
const v4 = uuid.v4; // generating unique id

// category total calculation utility. Should be separated?
const calculateTotals = (arr) => {
  const Totals = {
    All: 0,
  };
  arr.map((e) => {
    Totals.All += e.amount;
    Totals[e.category]
      ? (Totals[e.category] += e.amount)
      : (Totals[e.category] = e.amount);
  });
  return Totals;
};

const Goal = {
  async create(req, res) {
    // pass values from request body into new goal
    const text = `INSERT INTO
        goals(id, author_id, category, amount, date, description)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;
    const values = [
      v4(),
      req.user.id,
      req.body.category,
      req.body.amount,
      req.body.date,
      req.body.description,
    ];
    try {
      const { rows } = await db.query(text, values); // pass query to db
      return res.status(201).send(rows[0]); // if successful return the new row
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getAll(req, res) {
    const findAllQuery = `SELECT * FROM goals where author_id = $1`;
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]); // pass query to db
      const categoryTotals = calculateTotals(rows);
      return res.status(200).send({ rows, rowCount, categoryTotals }); // if successful return all rows
    } catch (error) {
      return res.status(400).send(error);
    }
  },

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

  async update(req, res) {
    // get goal of a given id, and pass in updated values from request body
    const findOneQuery = `SELECT * FROM goals WHERE id=$1 AND author_id=$2`; // find the goal
    const updateOneQuery = `UPDATE goals
        SET category=$1, amount=$2, date=$3, description=$4
        WHERE id=$5 AND author_id=$6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [
        req.params.id,
        req.user.id,
      ]); // run query to locate transaction
      if (!rows[0]) {
        return res.status(404).send({ message: "goal not found" });
      }
      const values = [
        req.body.category || rows[0].category,
        req.body.amount || rows[0].amount,
        req.body.date || rows[0].date,
        req.body.description || rows[0].description,
        req.params.id,
        req.user.id,
      ];
      const response = await db.query(updateOneQuery, values); // if found, pass in values
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

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

module.exports = Goal;
