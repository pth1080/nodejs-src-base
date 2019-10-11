import jwt from 'jsonwebtoken'
import config from '../../config/jwt-options'
import ResponseHelper from '../helpers/response'
// sign
export async function sign (obj) {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, config.secretkey, config.expiresIn, (error, token) => {
      if (error) {
        return reject(
          ResponseHelper.respondWithError(
            null,
            401,
            'AUTHENTICATION_FAILED'
          )
        )
      }
      resolve(token)
    })
  })
}
// verify
export async function verify (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secretkey, (error, obj) => {
      if (error) {
        return reject(
          ResponseHelper.respondWithError(
            null,
            401,
            'AUTHENTICATION_FAILED'
          )
        )
      }
      delete obj.iat
      delete obj.exp
      resolve(obj)
    })
  })
}
