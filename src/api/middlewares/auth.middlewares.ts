import { prismaClient as client } from '@client'
import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

import config from '@config'

import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'

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

    if (!userLogged) throw new ClientError(msg.userNotFound)
    response.locals.user = userLogged
  } catch (e) {
    if (e instanceof ClientError) {
      return response.status(e.status).send({ error: { ...e } })
    }
    if (e instanceof TokenExpiredError) {
      return response.status(410).send({ error: { ...e } })
    }
    if (e instanceof JsonWebTokenError) {
      return response.status(401).send({ error: { ...e } })
    }
    if (e instanceof SyntaxError) {
      return response.status(401).send({ error: 'Invalid syntax.' })
    }
    console.error(e)
    return response.status(500).send({ error: e })
  }
  return next()
}

export { ensureAuthenticate }
