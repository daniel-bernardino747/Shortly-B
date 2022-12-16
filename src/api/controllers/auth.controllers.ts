import { Request, Response } from 'express'

import { Messages } from '@/messages'

import { AuthenticateServices } from '../services/auth.services'

class AuthenticateController {
  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body

      const authServices = new AuthenticateServices()

      const token = await authServices.execute({
        email,
        password,
      })

      return response.status(200).send({ token })
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

export { AuthenticateController }
