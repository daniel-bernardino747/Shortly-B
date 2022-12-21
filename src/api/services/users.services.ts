import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import config from '@config'

import { emailVerify } from '@constants/regexp.constants'
import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'

import * as ts from '@src/types/services'

import { UrlRepository } from '../repositories/urls.repositories'
import { UserRepository } from '../repositories/users.repositories'

export class UserServices implements ts.IUserServices {
  private readonly usersRepo
  private readonly urlsRepo

  constructor() {
    this.usersRepo = new UserRepository()
    this.urlsRepo = new UrlRepository()
  }
  public async create({
    name,
    email,
    password,
    confirmPassword,
  }: ts.IUserRequest) {
    const bodyIncorrect =
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword

    if (bodyIncorrect) throw new ClientError(msg.bodyNotMatch)

    const validEmail = emailVerify.test(email)
    if (!validEmail) throw new ClientError(msg.invalidEmail)

    const userExists = await this.usersRepo.find({ email })
    if (userExists) throw new ClientError(msg.emailUnavailable)

    await this.createUser({ name, email, password })
  }
  public async viewOne({
    authUser,
  }: {
    authUser: User
  }): Promise<ts.IUser | undefined> {
    const dbUser = await this.usersRepo.view({ id: authUser.id })
    const { id, name, urls } = dbUser as ts.IUserInfos

    const {
      _sum: { visited_count: visitCount },
    } = await this.urlsRepo.sumVisitedUrls(authUser.id)

    return {
      id,
      name,
      visitCount,
      shortenedUrls: urls,
    }
  }
  public async viewRanking(): Promise<ts.IRanking[] | undefined> {
    const dbRanking: ts.IRanking[] = await this.usersRepo.rank()

    const ranking = dbRanking.map((value) => {
      return {
        ...value,
        linksCount: Number(value.linksCount),
        visitCount: Number(value.visitCount),
      }
    })
    return ranking
  }
  private async createUser(newUser: ts.IUserCreate) {
    const passwordHash = await hash(newUser.password, Number(config.hash))
    const user = await this.usersRepo.create({
      name: newUser.name,
      email: newUser.email.toLowerCase(),
      password: passwordHash,
    })

    const firstToken = sign({}, config.keyJWT as string, {
      subject: user.id.toString(),
      expiresIn: config.timeExpires,
    })

    await this.usersRepo.update({ token: firstToken }, user.id)

    return user
  }
}
