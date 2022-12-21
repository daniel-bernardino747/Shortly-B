import * as express from 'express'

import { URLsController } from '@controllers/urls.controllers'
import { ensureAuthenticate } from '@middlewares/auth.middlewares'

const routes = express.Router()

const urlsController = new URLsController()

routes.get('/urls/:id', urlsController.view)

routes.delete('/urls/:id', ensureAuthenticate, urlsController.delete)

routes.post('/url/shorten', ensureAuthenticate, urlsController.create)

routes.get('/urls/open/:shortUrl', urlsController.redirect)

export default routes
