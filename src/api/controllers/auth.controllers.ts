import { Request, Response } from 'express'

import { ClientError } from '@helpers/errors.helpers'

import { IAuthServices } from '../services'
import { AuthServices } from '../services/auth.services'
import * as ts from './index.d'

const authServices: IAuthServices = new AuthServices()

export class AuthController implements ts.IAuthController {
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
