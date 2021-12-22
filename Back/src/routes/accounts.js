import express from "express";
import mysql from "mysql2/promise";
import { isLoggedIn } from "../../index.js";
import { connectToDb } from "../../dbConfig";


const router = express.Router();

router.use('*', isLoggedIn);

router.get('/', async (req, res) => {
  const userId = req.headers.userDetails.id;
  const query = `SELECT accounts.id, accounts.group_id, accounts.user_id, \`groups\`.name 
  FROM accounts
  LEFT JOIN \`groups\`
  ON \`groups\`.id = accounts.group_id
  WHERE accounts.user_id = ${mysql.escape(userId)}
  `;
  try {
    const data = await connectToDb(query);
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.group_id) {
    return res.status(400).send({ err: "eror data" });
  }
  try {
    const userId = req.headers.userDetails.id;
    const groupId = req.body.group_id;
    const query = `INSERT INTO accounts (user_id, group_id) 
    VALUES ( 
    ${mysql.escape(userId)},
    ${mysql.escape(groupId)}
      )`;
    const data = await connectToDb(query);
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});
module.exports = router;