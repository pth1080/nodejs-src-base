// import controller
import UserController from '../../controllers/user.ctrl'
import authentication from '../../middlewares/authentication'

const router = require('express').Router()
let controller = new UserController()
// GET
router.get('/me', authentication, controller.me) // get user info
// POST
router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/update/password', authentication, controller.updatePassword)
export default router
