import * as express from 'express'

import { URLsController } from '@controllers/urls.controllers'
import { ensureAuthenticate } from '@middlewares/auth.middlewares'

const routes = express.Router()

const urlsController = new URLsController()

routes.get('/urls/:id', urlsController.viewOne)

routes.delete('/urls/:id', ensureAuthenticate, urlsController.deleteOne)

routes.post('/url/shorten', ensureAuthenticate, urlsController.create)

export default routes
