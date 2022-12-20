import * as express from 'express'

import { URLsController } from '@controllers/urls.controllers'
import { ensureAuthenticate } from '@middlewares/auth.middlewares'

const routes = express.Router()

const urlsController = new URLsController()

routes.post('/url/shorten', ensureAuthenticate, urlsController.create)

export default routes
