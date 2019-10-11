import * as jwt from '../helpers/jwt'
const authenticate = (req, res, next) => {
  let userID = jwt.verify(req.authentication)
  req.userID = userID
  next()
}
export default authenticate
