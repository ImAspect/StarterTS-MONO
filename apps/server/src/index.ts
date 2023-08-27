import 'reflect-metadata'
import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { initServer, createExpressEndpoints } from '@ts-rest/express'
import { accountRouter } from './routers/router.account'
import { authContract as Auth, accountContract as Account } from '@starterts/contracts'
import * as swaggerUi from 'swagger-ui-express'
import { openApiDocument } from './utils/util.document'
import { authRouter } from './routers/router.auth'
import { env } from './utils/util.env'

const app: Application = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

export const server = initServer()

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: env.API_NAME,
  swaggerOptions: {
    docExpansion: 'list',
    deepLinking: false,
  },
}

createExpressEndpoints(Auth, authRouter, app)
createExpressEndpoints(Account, accountRouter, app)

app.use('/api', swaggerUi.serve, swaggerUi.setup(openApiDocument, options))

export default app
