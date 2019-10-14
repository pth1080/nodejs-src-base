import User from './user.router'
const router = require('express').Router()
// Create use routers
router.use('/user', User)
export default router
