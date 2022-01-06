const config = require('../config/config');
const mysql = require('mysql2/promise');

async function createDb(){
    const pool = mysql.createPool(config.dbconfig);

    let deleteQuery = `DROP TABLE IF EXISTS users`;
    let createQuery = `CREATE TABLE users(
        id bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
        username varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        password varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        first_name varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        last_name varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        type ENUM('SUPERUSER','MAKER','CHECKER','SIGNER')  NOT NULL,
        status tinyint(1) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id) USING BTREE,
        UNIQUE INDEX index_tiga(username) USING BTREE
      ) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic`;

    try { 
        await pool.execute(deleteQuery);
        await pool.execute(createQuery);
        console.log("Table created users successfully.");
    } catch (err) {
        console.error("Table users creation failed:", err);
    }

    return true;
}


createDb()

module.exports = createDb