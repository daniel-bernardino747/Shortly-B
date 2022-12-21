import { prismaClient as client } from '@client'
import { User } from '@prisma/client'

import * as ts from './index.d'

export class UserRepository implements ts.IUserRepository {
  public async findUser(email: string): Promise<User | null> {
    return client.user.findUnique({
      where: {
        email,
      },
    })
  }
  public async updateUser(changes: ts.IUpdateUser, id: number): Promise<User> {
    return client.user.update({
      data: {
        ...changes,
      },
      where: {
        id,
      },
    })
  }
}
