import express from "express";
import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

const main = async () => {
    const app = express();

    const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PW} =  process.env;

    try {

        const connection = await mysql.createConnection({
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            password: MYSQL_PW,
            database: "users",
         });
       
    
        const createBillsTable = `CREATE TABLE IF NOT EXISTS Bills ( 
            id INTEGER NOT NULL AUTO_INCREMENT,
            group_id INT NOT NULL,
            description TEXT NOT NULL,
            amount DECIMAL(3, 2) NOT NULL,
            PRIMARY KEY (id)),
            FOREIGN KEY (group_id) REFERENCES groups (id)`;
            
        const createUsersTable = `CREATE TABLE IF NOT EXISTS Users ( 
            id INTEGER NOT NULL AUTO_INCREMENT,
            full_name TEXT (20) NOT NULL,
            email VARCHAR (50) NOT NULL,
            password VARCHAR (50) NOT NULL,
            REG_TIMESTAMP INTEGER,
            PRIMARY KEY (id))`;

        const createGroupsTable = `CREATE TABLE IF NOT EXISTS Groups (
            id INTEGER NOT NULL AUTO_INCREMENT,
            full_name TEXT (20) NOT NULL,
            PRIMARY KEY (id))`;

        const createAccountsTable = `CREATE TABLE IF NOT EXISTS Accounts ( 
            id INTEGER NOT NULL AUTO_INCREMENT,
            group_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY (id);
            FOREIGN KEY (group_id) REFERENCES groups (id),
            FOREIGN KEY (user_id) REFERENCES users (id))`;
                
        await connection.query(createUsersTable);
        await connection.query(createBillsTable);
        await connection.query(createGroupsTable);
        await connection.query(createAccountsTable);
                
        app.get("/", (req, res) => {
            res.send({
                ip: req.ip,  
            });
        });

        app.listen(8080, () => {
        console.log("http://localhost:8080");
        });

    } catch (error) {
        console.log(error);
    }

    module.exports = {
        connectToDb: async (query) => {
          const con = await mysql.createConnection(dbConfig);
          const [data] = await con.execute(query);
          await con.end();
      
          return data;
        },
    };
};

main();