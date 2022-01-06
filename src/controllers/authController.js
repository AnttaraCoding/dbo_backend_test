const { authModel } = require('../models/')
const jwt = require('jsonwebtoken')
const env = require('../config/config')
const rsp = require('../config/response')
const bcrypt = require('bcryptjs')

class authController {
    static async register(req, res){
        try{
            let {username, password, first_name, last_name, type, status} = req.body
            password = await bcrypt.hash(password, 8)
            await authModel.register(username, password, first_name, last_name, type, status, req.con)
            rsp.ok("register successful", null, res)
        }catch(err){
            rsp.err(err, 401, res)
        }
    }

    static async show(req, res){
        try{
            let { page, limit } = req.query;  
            page = parseInt(page)  
            limit = parseInt(limit)     
            let offset  = page == 1 ? 0 : (limit*page)-(limit+1);

            let result = await authModel.getList(limit, offset, req.con)    
            
            let totalPage = Math.ceil(result.total / limit);
            let arrRes = {
                prev    : {
                    active : page == 1 ? false : true,
                    url : `${env.base_url}/auth?page=${ page == 1 ? 1 : page-1}&limit=${limit}`
                },
                next    : {
                    active : page >= totalPage ? false : true,
                    url : `${env.base_url}/auth?page=${ page < totalPage ? page+1 : page }&limit=${limit}`,
                },
                list    : result.list,
                total   : result.total,
                page   : `${page} / ${totalPage}`
            }
            
            rsp.ok("show list data auths", arrRes, res)
        }catch(err){
            rsp.err(err, 401, res)
        }
    }

    static async login(req, res){
        try{
            const { username, password } = req.body;    
            let getUser = await authModel.findByCredentials(username, password, req.con) 
            if (getUser.err) {
                return rsp.err(getUser.msg, 401, res)
            }

            const isPasswordMatch = await bcrypt.compare(password, getUser.user.password)
            if(!isPasswordMatch){
                return rsp.err("Invalid login credentials", 401, res)
            }

            const token = jwt.sign( getUser.user, env.jwtkey, { expiresIn : env.jwtextime })
            
            return rsp.ok("Login success", {username, token}, res)
        }catch(err){
            rsp.err(err, 401, res)
        }
    }
}

module.exports = authController;