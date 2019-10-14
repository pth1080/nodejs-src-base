import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import ValidationHelp from '../helpers/validation'
import ResponseHelper from '../helpers/response'
// routers
import router from '../routers'
const Validation = new ValidationHelp()

export default () => {
  const app = express()
  app.disable('x-powered-by')

  app.use(bodyParser.json())

  app.use(cors())
  app.use(Validation.provideDefaultValidator())
  // register router api
  app.use('/', router)

  app.use((err, req, res, next) => {
    return ResponseHelper.respondWithError(res, 500, err.message)
  })

  return app
}
