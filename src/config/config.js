// 
// Config Applications
// ---------------------------

let NODE_ENV    = 'DEVELOPMENT'

let base_url      = NODE_ENV === 'DEVELOPMENT' ? 'http://localhost:9003/api/v1' : '';


let port        = '9003'
let jwtkey      = 'P@ssw0rdCCP'
let jwtextime   = '1d'


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
    jwtkey,
    jwtextime,
    port
};