import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { prismaClient as client } from '@client'
import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'
import { IRequest } from '@types'

import config from '../../config'

class AuthenticateServices {
  public async execute({ email, password }: IRequest) {
    if (!email && !password) throw new ClientError(msg.bodyNotMatch)

    console.log(1)
    const userExists = await this.findUser(email)

    if (!userExists) throw new ClientError(msg.userNotExist)

    const passwordMatch = await compare(password, userExists.password)
    if (!passwordMatch) throw new ClientError(msg.userNotExist)

    const token = await this.createToken(userExists.id.toString())
    return token
  }
  private async findUser(email: string) {
    return client.user.findFirst({
      where: {
        email,
      },
    })
  }
  private async createToken(id: string) {
    const token = sign({}, config.keyJWT as string, {
      subject: id,
      expiresIn: config.timeExpires,
    })
    await client.user.update({
      data: {
        token,
      },
      where: {
        id: Number(id),
      },
    })
    return token
  }
}

export { AuthenticateServices }
