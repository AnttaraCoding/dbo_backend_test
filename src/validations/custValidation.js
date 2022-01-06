const { body, checkSchema } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'checkInput': {
      return [
        body('cust_id', "customer id doesn't exists").exists(),
        checkSchema({
          type: {
            matches: {
              options: [/\b(?:BRONZE|SILVER|GOLD|PLATINUM)\b/],
              errorMessage: "Invalid type"
            }
          },
          first_name: {
            isLength: {
              errorMessage: 'first name should be at least 4 chars & max 20 chars',
              options: {
                min: 4,
                max: 20
              }
            }
          },
          last_name: {
            isLength: {
              errorMessage: 'last name should be at least 4 chars & max 20 chars',
              options: {
                min: 4,
                max: 20
              }
            }
          },
          address: {
            isLength: {
              errorMessage: 'address should be at least 4 chars & max 20 chars',
              options: {
                min: 4,
                max: 20
              }
            }
          },

        })
      ]
    }
    case 'checkInputUpdate': {
      return [
        checkSchema({
          type: {
            matches: {
              options: [/\b(?:BRONZE|SILVER|GOLD|PLATINUM)\b/],
              errorMessage: "Invalid type"
            }
          },
          first_name: {
            isLength: {
              errorMessage: 'first name should be at least 4 chars & max 20 chars',
              options: {
                min: 4,
                max: 20
              }
            }
          },
          last_name: {
            isLength: {
              errorMessage: 'last name should be at least 4 chars & max 20 chars',
              options: {
                min: 4,
                max: 20
              }
            }
          },
          address: {
            isLength: {
              errorMessage: 'address should be at least 4 chars & max 20 chars',
              options: {
                min: 4,
                max: 20
              }
            }
          },

        })
      ]
    }
    case 'pageList': {
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