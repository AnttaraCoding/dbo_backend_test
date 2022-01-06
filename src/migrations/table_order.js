const config = require('../config/config');
const mysql = require('mysql2/promise');

async function createDb(){
    const pool = mysql.createPool(config.dbconfig);

    let deleteQuery = `DROP TABLE IF EXISTS orders`;
    let createQuery = `CREATE TABLE orders  (
      id bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
      order_id varchar(10) NOT NULL,
      cust_id varchar(8) NOT NULL,
      item varchar(40) NOT NULL,
      price bigint(0) NOT NULL,
      qty int(0) NOT NULL,
      user_id varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),

      FOREIGN KEY (cust_id) REFERENCES customers (cust_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (username) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic`;

    try { 
        await pool.execute(deleteQuery);
        await pool.execute(createQuery);
        console.log("Table created orders successfully.");
    } catch (err) {
        console.error("Table order creation failed:", err);
    }

    return true;
}

createDb()

module.exports = createDb