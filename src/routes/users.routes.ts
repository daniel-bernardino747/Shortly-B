import * as express from 'express'

import { UserController } from '@controllers/users.controllers'
import { ensureAuthenticate } from '@middlewares/auth.middlewares'

const routes = express.Router()

const usersController = new UserController()

routes.get('/users/me', ensureAuthenticate, usersController.getMe)

export default routes
