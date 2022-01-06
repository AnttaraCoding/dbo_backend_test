const mysql = require('mysql2/promise');
const env = require('./config');

class connection {

    static async create(){
        try{
            var con = await mysql.createPool(env.dbconfig);
            console.log(`Database Connected`)
            return con;
        }catch(err){
            console.log({
                err : true,
                msg : err
            })
            return false;
        }
    }

    static async connect(req, res, next){
        try{
            req.con = await connection.create();
            next();
        }catch(err){
            res.status(401).send({
                err: true,
                msg: 'Database not Connect',
                res: err
            })
        }
    }
} 

module.exports = connection;