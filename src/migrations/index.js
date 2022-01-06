const customer = require('./table_customer.js');
const user = require('./table_user');
const order = require('./table_order');


const config = require('../config/config');
const mysql = require('mysql2/promise');

console.log(config.dbconfig)

(async () => {    
    await customer()     
    await user()
    await order()

    let query = 'SET FOREIGN_KEY_CHECKS=0'
    const pool = mysql.createPool(config.dbconfig);
    await pool.execute(query);

    console.log(`Migration success`)
  })();