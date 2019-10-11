import UserModel from '../models/user.model'
import MessageCode from '../errors/message-code'
import ValidationError from '../errors/validation'
class UserRepo {
  async GetByID (userID) {
    let user = await UserModel.findById(userID)
    if (!user) throw new ValidationError(MessageCode.USER_001)
    return user
  }

  async Create (username, email, password, fullName) {
    let create = await UserModel.create({
      username,
      password,
      email,
      fullName
    })
    return create
  }

  async GetByEmail (email) {
    let user = await UserModel.findOne({
      email
    })
    if (!user) throw new ValidationError(MessageCode.USER_001)
    return user
  }

  async UpdatePassword (userID, password) {
    let user = await UserModel.findByIdAndUpdate(userID, {
      password: password
    })
    return user
  }
}
export default UserRepo
