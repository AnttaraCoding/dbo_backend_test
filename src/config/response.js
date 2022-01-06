'use strict';

exports.ok = function(msg, datas, res) {
    var data = {
        'ERR' : false,
        'CODE': 200,
        'MSG': msg,
        'DATA': datas
    };
    res.status(200).send(data);
    res.end();
};

exports.err = function(msg, errorkode = 401, res) {
    var data = {
        'ERR' : true,
        'CODE': errorkode,
        'MSG': msg
    };
    res.status(errorkode).send(data);
    res.end();
};