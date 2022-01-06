const customer = require('./table_customer.js');
// const uker = require('./table_uker');
// const user = require('./table_user');
// const menu = require('./table_menu');


const config = require('../config/config');
const mysql = require('mysql2/promise');

console.log(config.dbconfig)

(async () => {    
    await customer()   
    // await uker()   
    // await user()
    // await menu()

    let query = 'SET FOREIGN_KEY_CHECKS=0'
    const pool = mysql.createPool(config.dbconfig);
    await pool.execute(query);

    console.log(`Migration success`)
  })();