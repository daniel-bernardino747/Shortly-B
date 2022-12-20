import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import config from 'src/config'

import { prismaClient as client } from '@client'
import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'
import { IUserCreate, IUserRequest } from '@types'

class UserServices {
  public async execute({
    name,
    email,
    password,
    confirmPassword,
  }: IUserRequest) {
    if (!name || !email || !password || !confirmPassword)
      throw new ClientError(msg.bodyNotMatch)

    const userExists = await this.findUser(email)
    if (userExists) throw new ClientError(msg.emailUnavailable)

    if (password !== confirmPassword) throw new ClientError(msg.bodyNotMatch)

    await this.createUser({ name, email, password })
  }
  private async findUser(email: string) {
    return client.user.findFirst({
      where: {
        email,
      },
    })
  }
  private async createUser({ name, email, password }: IUserCreate) {
    const passwordHash = await hash(password, Number(config.hash))
    const user = await client.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })

    const firstToken = sign({}, config.keyJWT as string, {
      subject: user.id.toString(),
      expiresIn: config.timeExpires,
    })
    await client.user.update({
      data: {
        token: firstToken,
      },
      where: {
        id: user.id,
      },
    })

    user.token = firstToken

    return user
  }
}

export { UserServices }
