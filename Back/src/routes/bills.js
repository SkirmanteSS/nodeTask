import express from "express";
import mysql from "mysql2/promise";
import { isLoggedIn } from "../../index.js";
import { connectToDb } from "../../dbConfig";

const router = express.Router();

router.use('*', isLoggedIn);

router.get('/:groupId', async (req, res) => {
  const query = `SELECT bills.id, bills.group_id, bills.amount, bills.description
  FROM bills
  WHERE bills.group_id =${mysql.escape(req.params.groupId)}
  `;
  try {
    const data = await connectToDb(query);
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.group_id || !req.body.amount || !req.body.description) {
    return res.status(400).send({ err: "eror data" });
  }
  try {
    const groupId = req.body.group_id;
    const query = `INSERT INTO bills (group_id, amount, description) 
    VALUES ( 
    ${mysql.escape(groupId)},
    ${mysql.escape(req.body.amount)},
    ${mysql.escape(req.body.description)}
      )`;
    const data = await connectToDb(query);
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});
module.exports = router;