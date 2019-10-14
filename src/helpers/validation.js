import BaseAutoBindedClass from '../base/BaseAutoBind'

const expressValidator = require('express-validator')

class ValidationManager extends BaseAutoBindedClass {
  provideDefaultValidator () {
    return expressValidator({
      errorFormatter: ValidationManager.errorFormatter
    })
  }

  static errorFormatter (param, msg, value) {
    let namespace = param.split('.')
    let root = namespace.shift()
    let formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}
module.exports = ValidationManager
