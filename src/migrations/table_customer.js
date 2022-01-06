const config = require('../config/config');
const mysql = require('mysql2/promise');

async function createDb(){
    const pool = mysql.createPool(config.dbconfig);

    let deleteQuery = `DROP TABLE IF EXISTS customers`;
    let createQuery = `CREATE TABLE customers(
        cust_id varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        first_name varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        last_name varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        address varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        type ENUM('BRONZE','SILVER','GOLD','PLATINUM')  NOT NULL,
        status tinyint(1) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        PRIMARY KEY (cust_id)
      )`;

    try { 
        await pool.execute(deleteQuery);
        await pool.execute(createQuery);
        console.log("Table created customers successfully.");
    } catch (err) {
        console.error("Table customers creation failed:", err);
    }

    return true;
}
createDb()

module.exports = createDb