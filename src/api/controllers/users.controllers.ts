import { Request, Response } from 'express'

import { ClientError } from '@helpers/errors.helpers'
import { User } from '@prisma/client'
import { IUserServices } from '@types'

import { UserServices } from '../services/users.services'

const userServices: IUserServices = new UserServices()
class UserController {
  // private readonly userServices: IUserServices

  // constructor() {
  //   this.userServices = new UserServices()
  // }

  public async create(request: Request, response: Response) {
    try {
      const { name, email, password, confirmPassword } = request.body

      await userServices.execute({
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
  public async getMe(request: Request, response: Response) {
    try {
      const authUser: User = response.locals.user

      const user = await userServices.getMe({ user: authUser })

      return response.status(200).send({ ...user })
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
}

export { UserController }
