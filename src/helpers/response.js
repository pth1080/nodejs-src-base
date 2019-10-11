import HttpStatus from 'http-status-codes'

const BasicResponse = {
  success: false,
  message: '',
  result: {}
}

class ResponseHelper {
  static get HTTP_STATUS () {
    return HttpStatus
  }

  static getDefaultResponseHandler (res) {
    return {
      onSuccess: function (data, message, code) {
        ResponseHelper.respondWithSuccess(res, code || ResponseHelper.HTTP_STATUS.OK, data, message)
      },
      onError: function (error) {
        ResponseHelper.respondWithError(res, error.status || 500, error.message || 'Unknown error')
      }
    }
  }

  static respondWithSuccess (res, code, data, message = '') {
    let response = Object.assign({}, BasicResponse)
    response.success = true
    response.message = message
    response.result = data
    res.status(code).json(response)
  }

  static respondWithError (res, errorCode, message = '') {
    let response = Object.assign({}, BasicResponse)
    response.success = false
    response.message = message
    res.status(errorCode).json(response)
  }
}
export default ResponseHelper
