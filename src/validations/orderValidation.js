const { body, checkSchema } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'checkInput': {
      return [
        body('order_id', "customer id doesn't exists").exists(),
        body('cust_id', "customer id doesn't exists").exists(),
        checkSchema({
          item: {
            isLength: {
              errorMessage: 'item name should be at least 4 chars & max 20 chars',
              options: {
                min: 4,
                max: 20
              }
            }
          },
          price: {
            in: 'body',
            errorMessage: 'price value is wrong',
            isInt: true,
            toInt: true,
          },
          qty: {
            in: 'body',
            errorMessage: 'quantity value is wrong',
            isInt: true,
            toInt: true,
          }
        })
      ]
    }
    case 'checkInputUpdate': {
      return [
        checkSchema({
          item: {
            isLength: {
              errorMessage: 'item name should be at least 4 chars & max 20 chars',
              options: {
                min: 4,
                max: 20
              }
            }
          },
          price: {
            in: 'body',
            errorMessage: 'price value is wrong',
            isInt: true,
            toInt: true,
          },
          qty: {
            in: 'body',
            errorMessage: 'price value is wrong',
            isInt: true,
            toInt: true,
          }
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