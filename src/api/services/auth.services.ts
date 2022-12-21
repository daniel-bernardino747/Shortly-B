import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import config from '@config'

import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'

import { IAuthServices, ILoginRequest } from '@src/types/services'

import { UserRepository } from '../repositories/users.repositories'

export class AuthServices implements IAuthServices {
  private readonly UserRepo

  constructor() {
    this.UserRepo = new UserRepository()
  }

  public async authLogin({
    email,
    password,
  }: ILoginRequest): Promise<string | null> {
    if (!email && !password) throw new ClientError(msg.bodyNotMatch)

    const userExists = await this.UserRepo.find({ email })

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
    await this.UserRepo.update({ token }, Number(idUser))
    return token
  }
}
