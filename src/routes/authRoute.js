const { authController } = require('../controllers/');
const { authValidation } = require('../validations/')
const authMiddleware = require('../middlewares/authMiddleware')
const vld = require('../config/validation')

const authRoutes = (app) => {

    app.get(
        '/',
        authMiddleware,
        authController.show,
    )

    app.post('/login',
        authValidation.validate('checkLogin'), 
        vld.runValidate,
        authController.login
    )
    
    app.post('/registration',
        authValidation.validate('checkRegister'), 
        vld.runValidate,
        authController.register
    )
}


module.exports = authRoutes;