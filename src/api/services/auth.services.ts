import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import config from 'src/config'

import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'

import { UserRepository } from '../repositories/users.repositories'
import * as ts from './index.d'

export class AuthServices implements ts.IAuthServices {
  private readonly UserRepo

  constructor() {
    this.UserRepo = new UserRepository()
  }

  public async authLogin({
    email,
    password,
  }: ts.ILoginRequest): Promise<string | null> {
    if (!email && !password) throw new ClientError(msg.bodyNotMatch)

    const userExists = await this.UserRepo.findUser(email)

    if (!userExists) throw new ClientError(msg.invalidLogin)

    const passwordMatch = await compare(password, userExists.password)
    if (!passwordMatch) throw new ClientError(msg.invalidLogin)

    return this.createToken(userExists.id.toString())
  }
  private async createToken(idUser: string): Promise<string | null> {
    const token = sign({}, config.keyJWT as string, {
      subject: idUser,
      expiresIn: config.timeExpires,
    })
    await this.UserRepo.updateUser({ token }, Number(idUser))
    return token
  }
}
