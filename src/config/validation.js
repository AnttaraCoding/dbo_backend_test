const { validationResult } = require('express-validator')

exports.runValidate = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var data = {
            'ERR'   : true,
            'CODE'  : '202',
            'MSG'   : 'Validation Error',
            'RES'   : errors.array()
        };
        res.status(202).send(data);
        res.end();
    }else{
        next()
    }
};
