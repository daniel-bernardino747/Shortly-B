import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import config from 'src/config'

import msg, { Messages } from '@/messages'

async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authToken = request.headers.authorization
    if (!authToken) throw msg.invalidHeader
    const token = authToken?.replace('Bearer ', '')

    verify(token, config.keyJWT as string)
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
  return next()
}

export { ensureAuthenticate }
