import { NextFunction, Request, Response } from 'express'

import { prismaClient as client } from '@/client'
import msg, { Messages } from '@/messages'

function findSession(token: string) {
  return client.session.findFirst({
    where: {
      token,
    },
  })
}
async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authToken = request.headers.authorization
    if (!authToken) throw msg.invalidHeader
    const token = authToken?.replace('Bearer ', '')

    await findSession(token)

    return next()
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

export { ensureAuthenticate }
