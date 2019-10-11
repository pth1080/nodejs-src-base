import express from 'express'

import RouteV1 from './v1'

const router = express.Router()
// API V1
router.use('/v1', RouteV1)

export default router
