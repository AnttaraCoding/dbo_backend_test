const jwt = require('jsonwebtoken');
const env = require('../config/config')
const rsp = require('../config/response')

const Auth = async(req, res, next)=>{
    if(!req.header('Authorization')){
        return rsp.err("Access Denied", 401, res)
    }
    const token = req.header('Authorization').replace('Bearer ', '');

    try{
        const data = jwt.verify(token, env.jwtkey);
        req.islogin = data
        next();
    } catch(err){
        return rsp.err(err, 401, res)
    }
}

module.exports = Auth;