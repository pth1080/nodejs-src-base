import UserModel from '../models/user.model'
class UserRepo {
  async GetByID (userID) {
    let user = await UserModel.findById(userID)
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
    return user
  }

  async GetByUsername (username) {
    let user = await UserModel.findOne({
      username
    })
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
