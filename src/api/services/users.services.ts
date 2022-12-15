import { hash } from 'bcryptjs'

import { prismaClient as client } from '@/client'
import msg from '@/messages'
import config from 'src/config'

interface IUserCreate {
  name: string
  email: string
  password: string
}
interface IUserRequest extends IUserCreate {
  confirmPassword: string
}

class UserServices {
  async execute({ name, email, password, confirmPassword }: IUserRequest) {
    const userExists = await this.findUser(email)
    if (userExists) throw msg.emailUnavailable

    if (password !== confirmPassword) throw msg.differentPasswords

    await this.createUser({ name, email, password })
  }

  async findUser(email: string) {
    return client.user.findFirst({
      where: {
        email,
      },
    })
  }

  async createUser({ name, email, password }: IUserCreate) {
    const passwordHash = await hash(password, Number(config.hash))

    const user = await client.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })

    return user
  }
}

export { UserServices }
