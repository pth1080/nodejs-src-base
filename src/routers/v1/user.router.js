// import controller
import UserController from '../../controllers/user.ctrl'
import authentication from '../../middlewares/authentication'

const router = require('express').Router()
let controller = new UserController()
// POST
router.post('/login', authentication, controller.login)
router.post('/register', controller.register)
router.post('/update/password', controller.updatePassword)
