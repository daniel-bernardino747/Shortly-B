import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import config from 'src/config'

import { prismaClient as client } from '@client'
import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'
import { User } from '@prisma/client'
import { IUserCreate, IUserRequest, IUserToFront } from '@types'

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
  public async getMe({
    user,
  }: {
    user: User
  }): Promise<IUserToFront | undefined> {
    const aggregationVisits = await client.url.aggregate({
      _sum: {
        visited_count: true,
      },
      where: {
        user_id: user.id,
      },
    })
    const dbUser = await client.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        urls: {
          select: {
            id: true,
            shortened_url: true,
            original_url: true,
            visited_count: true,
          },
        },
      },
    })
    const userToFront = {
      id: dbUser?.id,
      name: dbUser?.name,
      visitCount: aggregationVisits._sum.visited_count,
      shortenedUrls: dbUser?.urls,
    }
    return userToFront
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
