import express from "express";
import mysql from "mysql2/promise"; 
import bcrypt from "bcrypt";
import joi from "joi";
import jwt from "jsonwebtoken";

import { dbConfig, jwtPassword } from "../../config";
import { connectToDb } from "../../dbConfig.js";

const router = express.Router();

const userSchema = joi.object({
  password: joi.string().min(6).max(50).required(),
  email: joi.string().email().trim().lowercase().required(),
  fullName: joi.string().min(5).required(),
});

const loginSchema = joi.object({
  password: joi.string().min(6).max(50).required(),
  email: joi.string().email().trim().lowercase().required(),
});

router.post('/register', async (req, res) => {
  let userInputs = req.body;
  try {
    userInputs = await userSchema.validateAsync(userInputs);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: "Repeat email or password"});
  }
  try {
    const encryptedPassword = bcrypt.hashSync(userInputs.password, 10);
    const dbResponse = await connectToDb(
      `INSERT INTO users (full_name, email, password) 
      VALUES (
        ${mysql.escape(userInputs.fullName)},
        ${mysql.escape(userInputs.email)},
       '${encryptedPassword}'
       )`,
    );

    console.log(dbResponse);
    return res.json({});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Error" });
  }
});

router.post('/login', async (req, res) => {
  let userInputs = req.body;
  try {
    userInputs = await loginSchema.validateAsync(userInputs);
  } catch (err) {
    return res.status(400).send({ err: "Repeat email or password" });
  }
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      ` SELECT * FROM users WHERE email = ${mysql.escape(
        userInputs.email,
      )} LIMIT 1`,
    );
    await con.end();

    if (data.length === 0) {
      return res.status(400).send({ err: "Repeat email or password" });
    }
    const isAuthed = bcrypt.compareSync(userInputs.password, data[0].password);
    const token = jwt.sign(
      { id: data[0].id, email: userInputs.email },
      jwtPassword,
    );

    return isAuthed
      ? res.send({ msg: "Success", token })
      : res.status(400).send({ err: "Repeat email or password" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error });
  }
});

module.exports = router;
