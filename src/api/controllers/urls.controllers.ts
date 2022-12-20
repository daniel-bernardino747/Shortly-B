import { Request, Response } from 'express'

import { ClientError } from '@helpers/errors.helpers'
import { IUrlsServices } from '@types'

import { URLsServices } from '../services/urls.services'

const urlsServices: IUrlsServices = new URLsServices()
class URLsController {
  // private readonly urlsServices: IUrlsServices

  // constructor() {
  //   this.urlsServices = new URLsServices()
  // }

  public async create(request: Request, response: Response) {
    const user = response.locals.user
    try {
      const { url: originalUrl } = request.body

      const shortUrl = urlsServices.execute({
        originalUrl,
        id: user.id,
      })

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
