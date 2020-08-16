const moment = require("moment");
const uuid = require("uuid");
const db = require("../db");

const v4 = uuid.v4;

exports.create = async (req, res) => {
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
    moment(req.body.date),
    moment(new Date()),
  ];

  try {
    const { rows } = await db.query(text, values); // pass query to db
    return res.status(201).send(rows[0]); // if successful return the new row
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getAll = async (req, res) => {
  // calculate monthly totals
  const calculateTotals = (arr) => {
    const months = {};
    arr.map((e) => {
      const month = moment(e.created_date).format("MM/YY");
      if (!months[month]) {
        months[month] = e.amount;
      } else {
        months[month] += e.amount;
      }
    });
    return months;
  };
  const findAllQuery = `SELECT * FROM transactions WHERE author_id = $1`;
  try {
    const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]); // pass query to db
    const monthlyTotals = calculateTotals(rows); // tally up category totals
    return res.status(200).send({ rows, rowCount, monthlyTotals });
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getRange = async (req, res) => {
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
  const text = `SELECT * FROM transactions WHERE author_id = $1 AND created_date >= $2 AND created_date <= $3`;
  try {
    const { rows, rowCount } = await db.query(text, [
      req.user.id,
      req.body.beginning,
      req.body.end,
    ]); // pass query to db
    const categoryTotals = calculateTotals(rows);
    return res.status(200).send({ rows, rowCount, categoryTotals }); // if successful return rows within date range
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getOne = async (req, res) => {
  // get transaction of a given ID from table
  const text = `SELECT * FROM transactions WHERE id = $1 AND author_id= $2`;
  try {
    const { rows } = await db.query(text, [req.params.id, req.user.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: "transaction not found" }); // if not found
    }
    return res.status(200).send(rows[0]); // if success, return the transaction row
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.update = async (req, res) => {
  // get transaction of a given id, and pass in updated values from request body
  const findOneQuery = `SELECT * FROM transactions WHERE id=$1 AND author_id = $2`; // find the transaction
  const updateOneQuery = `UPDATE transactions
      SET category=$1, description=$2, amount=$3, created_date=$4, modified_date=$5
      WHERE id=$6 AND author_id = $7 returning *`; // pass request body values into transaction
  try {
    const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]); // run query to locate transaction
    if (!rows[0]) {
      return res.status(404).send({ message: "transaction not found" });
    }
    const values = [
      req.body.category || rows[0].category,
      req.body.description || rows[0].description,
      req.body.amount || rows[0].amount,
      moment(req.body.date) || rows[0].date,
      moment(new Date()),
      req.params.id,
      req.user.id,
    ];
    const response = await db.query(updateOneQuery, values); // if found, pass in values
    return res.status(200).send(response.rows[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.delete = async (req, res) => {
  // remove transaction of given id from table
  const deleteQuery = `DELETE FROM transactions WHERE id=$1 AND author_id=$2 returning *`;
  try {
    const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]); // find a given transaction, and delete
    if (!rows[0]) {
      return res.status(404).send({ message: "transaction not found" });
    }
    return res.status(204).send({ message: "deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
