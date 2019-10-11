import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import ResponseHelper from '../helpers/response'
// routers
import router from '../routers'
export default () => {
  const app = express()
  app.disable('x-powered-by')

  app.use(bodyParser.json())

  app.use(cors())

  // register router api
  app.use('/', router)

  app.use((err, req, res, next) => {
    return ResponseHelper.respondWithError(res, 500, err.message)
  })

  return app
}
