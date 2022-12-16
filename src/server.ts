import * as cors from 'cors'
import * as dotenv from 'dotenv'
import * as express from 'express'

import routes from '@/routes'

import config from './config/index'

dotenv.config()

const app = express()
app.use(cors()).use(express.json()).use(routes)

const port = config.port || 3333
app.listen(port, () => {
  console.log(`🌀 started server in door: ${port}`)
})
