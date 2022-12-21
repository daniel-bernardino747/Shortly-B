import { User } from '@prisma/client'
import { Request, Response } from 'express'

import { ClientError } from '@helpers/errors.helpers'

import { IUrlController } from '@src/types/controllers'
import { IUrlsServices } from '@src/types/services'

import { URLsServices } from '../services/urls.services'

const urlsServices: IUrlsServices = new URLsServices()
export class URLsController implements IUrlController {
  public async view(request: Request, response: Response) {
    try {
      const idParams: string = request.params.id

      const url = await urlsServices.viewOne({ idParams })

      return response.status(200).send({ ...url })
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
  public async create(request: Request, response: Response) {
    const user: User = response.locals.user
    try {
      const { url: originalUrl } = request.body

      const shortUrl = await urlsServices.create({
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
  public async delete(request: Request, response: Response) {
    try {
      const idParams: string = request.params.id
      const { id: idUser }: { id: number } = response.locals.user

      await urlsServices.deleteOne({ idParams, idUser })

      return response.sendStatus(204)
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
  public async redirect(request: Request, response: Response) {
    try {
      const shortUrl: string = request.params.shortUrl

      const originalUrl = await urlsServices.openShortUrl({ shortUrl })

      return response.redirect(originalUrl as string)
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
}
