import { UserController } from '@/controllers/users.controllers'
import * as express from 'express'

const routes = express.Router()

const userController = new UserController()

routes.post('/signup', userController.create)

export default routes
