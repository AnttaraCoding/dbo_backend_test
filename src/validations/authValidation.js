const { body, checkSchema } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'checkLogin': {
            return [ 
                body('username', "userName doesn't exists").exists(),
                body('password', "password doesn't exists").exists()
            ]   
        }
        case 'checkRegister': {
            return [ 
                body('username', "userName doesn't exists").exists(),
                body('password', "password doesn't exists").exists(),
                checkSchema({
                    type: {
                      matches: {
                        options: [/\b(?:SUPERUSER|MAKER|CHECKER|SIGNER)\b/],
                        errorMessage: "Invalid type"
                      }
                    },
                    first_name: { 
                        isLength: { 
                            errorMessage: 'first name should be at least 4 chars & max 25 chars', 
                            options: { 
                                min: 4,
                                max: 20
                            } 
                        } 
                    },
                    last_name: { 
                        isLength: { 
                            errorMessage: 'last name should be at least 4 chars & max 25 chars', 
                            options: { 
                                min: 4,
                                max: 20
                            } 
                        } 
                    }
                })
            ]
        }
        case 'pageList' : {
            return [
              checkSchema({
                page: {
                  in: ['params', 'query'],
                  errorMessage: 'page value is wrong',
                  isInt: true,
                  toInt: true,
                }
              }),
              checkSchema({
                limit: {
                  in: ['params', 'query'],
                  errorMessage: 'page value is wrong',
                  isInt: true,
                  toInt: true,
                }
              }),
            ]
          }
    }
}