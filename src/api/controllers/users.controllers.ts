import { User } from '@prisma/client'
import { Request, Response } from 'express'

import { UserServices } from '@services/users.services'

import { ClientError } from '@helpers/errors.helpers'

import { IUserController } from '@src/types/controllers'
import { IUserServices } from '@src/types/services'

const userServices: IUserServices = new UserServices()

export class UserController implements IUserController {
  public async view(request: Request, response: Response) {
    try {
      const authUser: User = response.locals.user

      const user = await userServices.viewOne({ authUser })

      return response.status(200).send({ ...user })
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
  public async create(request: Request, response: Response) {
    try {
      const { name, email, password, confirmPassword } = request.body

      await userServices.create({
        name,
        email,
        password,
        confirmPassword,
      })

      return response.sendStatus(201)
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
  public async ranking(request: Request, response: Response) {
    try {
      const ranking = await userServices.viewRanking()
      return response.status(200).send({ ranking })
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
}
