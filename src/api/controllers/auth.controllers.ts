import { Request, Response } from 'express'

import { AuthServices } from '@services/auth.services'

import { ClientError } from '@helpers/errors.helpers'

import { IAuthController } from '@src/types/controllers'
import { IAuthServices } from '@src/types/services'

const authServices: IAuthServices = new AuthServices()

export class AuthController implements IAuthController {
  public async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body
      const token = await authServices.authLogin({
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
