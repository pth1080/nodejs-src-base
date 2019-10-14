import BaseController from './base'
import UserRepo from '../repositories/user.repo'
import * as validation from '../validation/user.validation'
import ValidationError from '../errors/validation'
import MessageCode from '../errors/message-code'
import * as jwt from '../helpers/jwt'

const userRepo = new UserRepo()

class UserController extends BaseController {
  async register (req, res) {
    const data = req.body
    try {
      let errors = await this.getErrorsParameters(req, validation.LOGIN_VALIDATION_SCHEMA)
      if (errors.length > 0) throw new ValidationError(errors)
      let isExistEmail = await userRepo.GetByEmail(data.email)
      if (isExistEmail) throw new ValidationError('EMAIL_IS_EXIST')
      let isExistUsername = await userRepo.GetByUsername(data.username)
      if (isExistUsername) throw new ValidationError('USERNAME_IS_EXIST')
      let user = await userRepo.Create(data.username, data.email, data.password)
      let token = await jwt.sign(user.id)
      console.log(token)
      return this.response(res).onSuccess(token)
    } catch (error) {
      console.log(error)
      return this.response(res).onError(error)
    }
  }

  async login (req, res) {
    const data = req.body
    try {
      let errors = await this.getErrorsParameters(req, validation.LOGIN_VALIDATION_SCHEMA)
      if (errors.length > 0) throw new ValidationError(errors)
      let user = await userRepo.GetByEmail(data.email)
      if (!user) throw new ValidationError(MessageCode.USER_001)
      const isMatch = await user.comparePassword(data.password)
      if (!isMatch) throw new ValidationError(MessageCode.USER_002)
      let token = await jwt.sign({ userID: user.id })
      return this.response(res).onSuccess(token)
    } catch (error) {
      console.log(error)
      return this.response(res).onError(error)
    }
  }

  async me (req, res) {
    const userID = req.userID
    try {
      let user = await userRepo.GetByID(userID)
      if (!user) throw new ValidationError(MessageCode.USER_001)
      return this.response(res).onSuccess(user)
    } catch (error) {
      return this.response(res).onError(error)
    }
  }

  async updatePassword (req, res) {
    const data = req.body
    const userID = req.userID
    try {
      let user = await userRepo.GetByID(userID)
      if (!user) throw new ValidationError(MessageCode.USER_001)
      const isMatch = await user.comparePassword(data.oldPwd)
      if (!isMatch) throw new ValidationError(MessageCode.USER_002)
      user.password = data.newPwd
      user.save()
      return this.response(res).onSuccess(MessageCode.SUCCESS)
    } catch (error) {
      return this.response(res).onError(error)
    }
  }
}
export default UserController
