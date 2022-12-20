import { Request, Response } from 'express'

import { AuthenticateServices } from '../services/auth.services'
import { ClientError } from './../../types/index'

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
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      return response.status(500).send({ error: e })
    }
  }
}

export { AuthenticateController }
