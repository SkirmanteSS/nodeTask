import mysql from "mysql2/promise";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { jwtPassword } from "./config";

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

const { port } = require('./config');
const auth = require('./routes/v1/auth');
const accounts = require('./routes/v1/accounts');
const bills = require('./routes/v1/bills');

const app = express();

const isLoggedIn = (req, res, next) => {
    const userDetails = getUserDetails(req);
    if (userDetails) {
      req.headers.userDetails = userDetails;
      return next();
    }
    return res.status(401).send({ err: 'incorrect details' });
  };

module.exports = {
    port: process.env.PORT || 8080,
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

app.use(express.json());
app.use(cors());
app.use('/routes/register/', auth);
app.use('/routes/accounts/', accounts);
app.use('/routes/bills', bills);
app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.get('*', (req, res) => {
  res.status(404).send({ err: 'Page not found' });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));