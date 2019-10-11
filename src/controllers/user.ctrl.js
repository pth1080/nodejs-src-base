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
      let user = userRepo.Create(data.username, data.email, data.password)
      let token = jwt.sign(user.id)
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
      let user = userRepo.GetByEmail(data.email)
      const isMatch = await user.comparePassword(data.password)
      if (!isMatch) throw new ValidationError(MessageCode.USER_001)
      let token = jwt.sign(user.id)
      return this.response(res).onSuccess(token)
    } catch (error) {
      console.log(error)
      return this.response(res).onError(error)
    }
  }

  async updatePassword (req, res) {
    const data = req.body
    const userID = req.userID
    try {
      let user = userRepo.GetByID(userID)
      const isMatch = await user.comparePassword(data.oldPwd)
      if (!isMatch) throw new ValidationError(MessageCode.USER_002)
      user.password = req.newPwd
      user.save()
      return this.response(res).onSuccess('success')
    } catch (error) {
      return this.response(res).onError(error)
    }
  }

  async search (req, res) {
    const data = req.body
    try {

    } catch (error) {
      return this.response(res).onError(error)
    }
  }
}
export default UserController
