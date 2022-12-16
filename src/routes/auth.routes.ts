import * as express from 'express'

import { AuthenticateController } from '@/controllers/auth.controllers'
import { UserController } from '@/controllers/users.controllers'

const routes = express.Router()

const userController = new UserController()
const authController = new AuthenticateController()

routes.post('/signup', userController.create)

routes.post('/signin', authController.login)

export default routes
