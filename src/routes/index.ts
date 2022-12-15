import * as express from 'express'

import authRoutes from './auth.routes'

const routes = express.Router()

routes.use(authRoutes)

export default routes
