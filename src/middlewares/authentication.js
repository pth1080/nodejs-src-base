import * as jwt from '../helpers/jwt'
const authenticate = async (req, res, next) => {
  let user = await jwt.verify(req.headers.authorization)
  req.userID = user.userID
  next()
}
export default authenticate
