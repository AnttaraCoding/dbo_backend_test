const { orderModel } = require('../models/')
const env = require('../config/config')
const rsp = require('../config/response')

class orderController {
    static async create(req, res){
        try{
            await orderModel.createOrder(req)
            rsp.ok("create order successful", null, res)
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

            let result = await orderModel.getList(limit, offset, req.con)    
            
            let totalPage = Math.ceil(result.total / limit);
            let arrRes = {
                prev    : {
                    active : page == 1 ? false : true,
                    url : `${env.base_url}/order?page=${ page == 1 ? 1 : page-1}&limit=${limit}`
                },
                next    : {
                    active : page >= totalPage ? false : true,
                    url : `${env.base_url}/order?page=${ page < totalPage ? page+1 : page }&limit=${limit}`,
                },
                list    : result.list,
                total   : result.total,
                page   : `${page} / ${totalPage}`
            }
            
            rsp.ok("show list data orders", arrRes, res)
        }catch(err){
            rsp.err(err, 401, res)
        }
    }

    static async detail(req, res){
        try{
            const { orderid } = req.params;    
            let getCust = await orderModel.getDetail(orderid, req.con) 
            rsp.ok(`get detail success total data ${getCust.length}`, getCust, res)
        }catch(err){
            rsp.err(err, 401, res)
        }
    }


    static async change(req, res){
        try{
            await orderModel.update(req)
            rsp.ok("update order successful", null, res)
        }catch(err){
            rsp.err(err, 401, res)
        }
    }

    static async delete(req, res){
        try{
            const { custid } = req.params; 
            await orderModel.delete(req)
            rsp.ok(`id ${custid} was deleted`, null, res)
        }catch(err){
            rsp.err(err, 401, res)
        }
    }
}

module.exports = orderController;