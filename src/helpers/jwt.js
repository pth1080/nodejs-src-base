import jwt from 'jsonwebtoken'
import config from '../../config/jwt-options'
// sign
export async function sign (obj) {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, config.secretkey, {
      expiresIn: config.expiresIn
    }, (error, token) => {
      if (error) {
        console.log({
          error
        })
        return reject(
          error
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
          error
        )
      }
      delete obj.iat
      delete obj.exp
      resolve(obj)
    })
  })
}
