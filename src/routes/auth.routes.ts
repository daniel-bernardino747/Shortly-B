import * as express from 'express'

import { AuthController } from '@controllers/auth.controllers'
import { UserController } from '@controllers/users.controllers'

const routes = express.Router()

const userController = new UserController()
const authController = new AuthController()

routes.post('/signup', userController.create)

routes.post('/signin', authController.login)

export default routes
