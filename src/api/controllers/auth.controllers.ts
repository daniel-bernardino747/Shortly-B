import { Request, Response } from 'express'

import { ClientError } from '@helpers/errors.helpers'
import { IAuthServices } from '@types'

import { AuthenticateServices } from '../services/auth.services'

const authServices: IAuthServices = new AuthenticateServices()

class AuthenticateController {
  // private readonly authServices: IAuthServices

  // constructor() {
  //   this.authServices = new AuthenticateServices()
  // }

  public async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body
      const token = await authServices.execute({
        email,
        password,
      })

      return response.status(200).send({ token })
    } catch (e) {
      if (e instanceof ClientError) {
        return response.status(e.status).send({ error: { ...e } })
      }
      console.error(e)
      return response.status(500).send({ error: e })
    }
  }
}

export { AuthenticateController }
