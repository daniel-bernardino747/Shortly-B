import * as express from 'express'

import authRoutes from './auth.routes'
import urlsRoutes from './urls.routes'

const routes = express.Router()

routes.use(authRoutes).use(urlsRoutes)

export default routes
