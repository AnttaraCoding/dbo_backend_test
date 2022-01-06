
const Conn = require('../config/database');
const rsp = require('../config/response');
const userController = require('../controllers/Users');
const UserValidation = require('../middlewares/userValidation');
const User_tst = require('../controllers/User_test');

const { body } = require('express-validator');

const Routes = (app) => {        
    
    app.all('/', (req,res) => {
        res.status(200).send({
            title: 'Undian BRI API',
            version: '1.0.0',
            author: 'CCP Team'
        });
    });

    app.post(
        '/v1/user/create', 
        Conn.connect,
        UserValidation.validate('createUser'), 
        userController.CreateData,
    )

    app.get('/v1/user/getall', Conn.connect, User_tst.getUsers);

    app.post('/v1/user/insert', Conn.connect, body('nama').not().isEmpty(), body('role').not().isEmpty(), User_tst.createUsers);

    app.post('/v1/user/updateUser:id', Conn, User_tst.updateUsers);
    app.get('/v1/user/getUserById:id', Conn, User_tst.getUsersById);
    
    // app.post('/getip', Access.getip);
    
    // app.post('/app_identify', Access.app_identify);
    // app.post('/regtidentify', auth,  Access.regtidentify);
    // app.post('/updtidentify', auth, Access.updtidentify);
    // // app.post('/deltidentify', auth, Access.deltidentify);
    // app.post('/appidentify', Access.appidentify);

    // // app.post('/login', Access.login);
    // app.post('/loginwtuser', Access.loginwtuser);

    // app.post('/access', auth, Access.get);
    // app.get('/access/:id', auth, Access.getByid);
    // app.put('/access/:id', auth, Access.update);
    // app.delete('/access/:id', auth, Access.deleteBy);

    // app.post('/user', auth, User.create);
    // app.post('/users', auth, User.showall);
    // app.post('/userid', auth, User.showbyid);
    // app.put('/user', auth, User.update);
    // app.delete('/user/:id', auth, User.deleteby);

    // app.get('/test', User.test);
    // // app.post('/rolelogin', auth, Role.roleLogin);
    
    // // app.get('/user/:id', auth, Access.getByid);
    // // app.put('/user/:id', auth, Access.update);
    // // app.delete('/user/:id', auth, Access.deleteBy);


    // // app.post('/roles', auth, Role.showall);
    // // app.post('/role', auth, Role.create);
    // // app.get('/role/:id', auth, Role.showbyid);
    // // app.put('/role', auth, Role.update);
    // // app.delete('/role', auth, Role.delete);

    // // app.post('/level', auth, Role.createLevel);
    // // app.post('/levels', auth, Role.showLevel);


    app.get('/header', (req, res) => {
        let ip = req.ip;
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }
        console.log("Hostname : "+req.hostname);
        console.log("Request IP : "+ip);
        res.status(201).send({user : ip});
    })

    app.post('/someroute', (req,res) => {
        const ip = req.headers;
        const body= req.body.request;
        res.status(201).send({header : ip, body : body});
        // console.log(ip); // ip address of the user
        // rsp.ok(result, `Welcome back ${data.api_user}`, res);
    });
    
    app.all('*', (req, res) => rsp.err('End Point Not Found', 404, res));

}


module.exports = Routes;