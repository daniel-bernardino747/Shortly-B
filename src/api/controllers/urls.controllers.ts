import { Request, Response } from 'express'

import { URLsServices } from '../services/urls.services'
import { ClientError } from './../../types/index'

class URLsController {
  async create(request: Request, response: Response) {
    const user = response.locals.user
    try {
      const { url: originalUrl } = request.body
      const urlsServices = new URLsServices()

      const shortUrl = await urlsServices.execute({ originalUrl, id: user.id })

      return response.status(201).send({ shortUrl })
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
}

export { URLsController }
