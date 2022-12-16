import { Request, Response } from 'express'

import { Messages } from '@/messages'

import { UserServices } from '../services/users.services'
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
      const error = e as Messages
      if (error.status) {
        return response.status(error.status).send({
          status: 'Error',
          code: error.status,
          message: error.message,
        })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
}

export { UserController }
