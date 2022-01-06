const { orderController } = require('../controllers/');
const { orderValidation } = require('../validations/')
const authMiddleware = require('../middlewares/authMiddleware')
const vld = require('../config/validation')
const rsp = require('../config/response')

const orderRoute = (app) => { 

    app.get(
        '/',
        authMiddleware,
        orderValidation.validate('pageList'),
        vld.runValidate,
        orderController.show,
    )

    app.post(
        '/create',
        authMiddleware,
        (req,res, next)=>{
            if(req.islogin.type != 'SUPERUSER' && req.islogin.type != 'MAKER' ){
                return rsp.err('Accees Denied, Only Maker can access this route', 401, res)
            }
            next()
        },
        orderValidation.validate('checkInput'), 
        vld.runValidate,
        orderController.create
    )

    app.get(
        '/detail/:orderid',
        authMiddleware,
        orderController.detail,
    )

    app.put(
        '/change/:id',
        authMiddleware,
        orderValidation.validate('checkInputUpdate'),
        vld.runValidate,
        orderController.change,
    )
    
    app.delete(
        '/delete/:orderid',
        authMiddleware,
        orderController.delete,
    )
}


module.exports = orderRoute;