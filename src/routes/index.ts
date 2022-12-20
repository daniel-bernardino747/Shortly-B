import * as express from 'express'

import authRoutes from './auth.routes'
import urlsRoutes from './urls.routes'
import usersRoutes from './users.routes'

const routes = express.Router()

routes.use(authRoutes).use(urlsRoutes).use(usersRoutes)

export default routes
