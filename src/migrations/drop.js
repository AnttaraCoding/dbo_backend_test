const config = require('../config/config');
const mysql = require('mysql2/promise');

async function createDb(){
    const pool = mysql.createPool(config.dbconfig);

    let deleteQuery1 = `DROP TABLE IF EXISTS orders`;
    let deleteQuery2 = `DROP TABLE IF EXISTS users`;
    let deleteQuery3 = `DROP TABLE IF EXISTS customers`;
    try { 
        await pool.execute(deleteQuery1);
        await pool.execute(deleteQuery2);
        await pool.execute(deleteQuery3);
        console.log("Drop table successfully.");
    } catch (err) {
        console.error("Table drop failed:", err);
    }

    return true;
}


module.exports = createDb