import express from "express";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import morgan from "morgan";

const _dirname = dirname(fileURLToPath(import.meta.url));

import { jwtPassword } from "./config";

const viewDirectory = path.join(_dirname, "views");

const getUserDetails = (req) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(' ')[1]
        : '';
      return jwt.verify(token, jwtPassword);
    } catch (err) {
      return null;
    }
  };

dotenv.config();
mysql2/promise.config();

const { port } = require('/dbConfig');
const register = require('/routes/register.js');
const accounts = require('/routes/accounts.js');
const bills = require('/routes/bills.js');

const app = express();

const isLoggedIn = (req, res, next) => {
    const userDetails = getUserDetails(req);
    if (userDetails) {
      req.headers.userDetails = userDetails;
      return next();
    }
    return res.status(401).send({ err: 'incorrect details' });
  };
app.set("views", viewsDirectory);

module.exports = {
    port: process.env.PORT || 5503,
    jwtPassword: process.env.JWT_PASSWORD,
    dbConfig: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
    },
  };

const module = module.exports = {
    getUserDetails,
    isLoggedIn,
};
app.use(morgan("dev"))
app.use(express.json());
app.use(cors());
app.use('/routes/register/', register);
app.use('/routes/accounts/', accounts);
app.use('/routes/bills', bills);
app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.get('*', (req, res) => {
  res.status(404).send({ err: 'Page not found' });
});

app.listen(5503, () => console.log(`Server is running on port ${port}`));