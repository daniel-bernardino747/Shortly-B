import { Request, Response } from 'express'

// import { Messages } from '@/messages'

import { UserServices } from '../services/users.services'
import { ClientError } from './../../types/index'

class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email, password, confirmPassword } = request.body

      const createUserService = new UserServices()

      await createUserService.execute({
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
      return response.status(500).send({ error: e })
    }
  }
}

export { UserController }
