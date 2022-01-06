const { custController } = require('../controllers/');
const { custValidation } = require('../validations/')
const authMiddleware = require('../middlewares/authMiddleware')
const vld = require('../config/validation')
const rsp = require('../config/response')

const custRoute = (app) => { 

    app.get(
        '/',
        authMiddleware,
        custValidation.validate('pageList'),
        vld.runValidate,
        custController.show,
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
        custValidation.validate('checkInput'), 
        vld.runValidate,
        custController.create
    )

    app.get(
        '/detail/:custid',
        authMiddleware,
        custController.detail,
    )

    app.put(
        '/change/:custid',
        authMiddleware,
        custValidation.validate('checkInputUpdate'),
        vld.runValidate,
        custController.change,
    )
    
    app.delete(
        '/delete/:custid',
        authMiddleware,
        custController.delete,
    )
}


module.exports = custRoute;