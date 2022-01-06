// 
// Config Applications
// ---------------------------

let NODE_ENV    = 'DEVELOPMENT'

let base_url      = NODE_ENV === 'DEVELOPMENT' ? 'http://localhost:9003/api/v1' : '';


let port        = '9003'
let ldap_url    = 'https://wsuser.bri.co.id/beranda/ldap/ws/ws_adUser.php?wsdl'
let jwtkey      = 'P@ssw0rdCCP'
let jwtextime   = '1d'

// ENVIRONMENT GLOBAL
let bristarsid      = NODE_ENV === 'DEVELOPMENT' ? 'briknow' : '';
let bristarskey     = NODE_ENV === 'DEVELOPMENT' ? 'fa14f443b2433ecc7a3091942aff8c41fdc92a90' : '';
let bristarsurl     = NODE_ENV === 'DEVELOPMENT' ? 'http://10.35.65.88/bristars_api/' : 'https://api.bristarts.bri.co.id/';

// ENVIRONMENT DATABASE
let connectionLimit = 0
let host            = NODE_ENV === 'DEVELOPMENT' ? 'localhost' : ''
let user            = NODE_ENV === 'DEVELOPMENT' ? 'antarra' : ''
let password        = NODE_ENV === 'DEVELOPMENT' ? 'P@ssw0rd' : ''
let database        = NODE_ENV === 'DEVELOPMENT' ? 'dbo_test' : ''
let dbconfig        = { connectionLimit, host, user, password, database }

  
module.exports = {
    base_url,
    dbconfig,
    bristarsurl,
    ldap_url,
    jwtkey,
    jwtextime,
    port,
    bristarsurl,
    bristarsid,
    bristarskey
};