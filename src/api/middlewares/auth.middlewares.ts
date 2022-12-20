import { NextFunction, Request, Response } from 'express'
import { TokenExpiredError, verify } from 'jsonwebtoken'
import config from 'src/config'

import { prismaClient as client } from '@/client'
import msg from '@/messages'

import { ClientError } from './../../types/index'

async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authToken = request.headers.authorization
    if (!authToken) throw new ClientError(msg.invalidHeader)
    const token = authToken?.replace('Bearer ', '')

    verify(token, config.keyJWT as string)

    const userLogged = await client.user.findFirst({
      where: {
        token,
      },
    })
    response.locals.user = userLogged
  } catch (e) {
    if (e instanceof ClientError) {
      return response.status(e.status).send({ error: { ...e } })
    }
    if (e instanceof TokenExpiredError) {
      return response.status(410).send({ error: { ...e } })
    }
    return response.status(500).send({ error: e })
  }
  return next()
}

export { ensureAuthenticate }
