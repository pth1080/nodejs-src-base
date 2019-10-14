import ResponseHelper from '../helpers/response'
import BaseAutoBind from '../base/BaseAutoBind'

class BaseController extends BaseAutoBind {
  constructor () {
    super()
    if (new.target === BaseController) {
      throw new TypeError('Cannot construct BaseController instances directly')
    }
    this._responseHelper = ResponseHelper
    this.response = this._responseHelper.getDefaultResponseHandler
  }
  getErrorsParameters (req, bodySchema, querySchema, paramsSchema) {
    let errors = []
    if (bodySchema) req.checkBody(bodySchema)
    if (querySchema) req.checkQuery(querySchema)
    if (paramsSchema) req.checkParams(paramsSchema)

    return req.getValidationResult().then(result => {
      if (!result.isEmpty()) {
        errors = result.array().map(function (elem) {
          return elem.msg
        })
        return errors
      }
      return errors
    })
  }
}
export default BaseController
