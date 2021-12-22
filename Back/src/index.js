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
            database: "ecommerce",
        });

        const createUsersTable = `
        CREATE TABLE IF NOT EXISTS Users 
            id INTEGER NOT NULL AUTO_INCREMENT,
            full_name TEXT (20) NOT NULL,
            email VARCHAR (50) NOT NULL,
            password VARCHAR (50) NOT NULL,
            REG_TIMESTAMP

            ,
            PRIMARY KEY (id)`;

        const creatBillsTable = `
        CREATE TABLE IF NOT EXISTS Bills (
            id INTEGER NOT NULL AUTO_INCREMENT,
            product_id INTEGER NOT NULL,
            customer_name VARCHAR (20) NOT NULL,
            customer_email VARCHAR (50) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (product_id) REFERENCES Products (id)`;

        await connection.query(createUsersTable);
        await connection.query(creatBillsTable);
        
        app.get("/", (req, res) => {
            res.send({
                ip: req.ip,  
            });
        });

        app.listen(5501, () => {
        console.log("http://localhost:8080");
        });
    } catch (error) {
        console.log(error);
    }
};

main();