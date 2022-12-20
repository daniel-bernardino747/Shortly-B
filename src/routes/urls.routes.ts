import * as express from 'express'
import { ensureAuthenticate } from 'src/api/middlewares/auth.middlewares'

import { URLsController } from '@/controllers/urls.controllers'

const routes = express.Router()

const urlsController = new URLsController()

routes.post('/url/shorten', ensureAuthenticate, urlsController.create)

export default routes
