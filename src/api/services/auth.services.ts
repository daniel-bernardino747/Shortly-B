import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { prismaClient as client } from '@/client'
import msg from '@/messages'

import config from '../../config'

interface IRequest {
  email: string
  password: string
}

class AuthenticateServices {
  async execute({ email, password }: IRequest) {
    if (!email && !password) throw msg.bodyNotMatch

    const userExists = await this.findUser(email)

    if (!userExists) throw msg.userNotExist

    const passwordMatch = await compare(password, userExists.password)
    if (!passwordMatch) throw msg.userNotExist

    const token = await this.createToken(userExists.id.toString())

    return token
  }

  async findUser(email: string) {
    return client.user.findFirst({
      where: {
        email,
      },
    })
  }
  async createToken(id: string) {
    return sign({}, config.keyJWT as string, {
      subject: id,
      expiresIn: config.timeExpires,
    })
  }
}

export { AuthenticateServices }
