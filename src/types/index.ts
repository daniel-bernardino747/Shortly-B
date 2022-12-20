import { User } from '@prisma/client'

export interface IUrl {
  originalUrl: string
  id: number
}
export interface ICreateShortUrl {
  userId: number
  originalUrl: string
  shortUrl: string
}
export interface IRequest {
  email: string
  password: string
}
export interface IUserCreate {
  name: string
  email: string
  password: string
}
export interface IUserRequest extends IUserCreate {
  confirmPassword: string
}

export interface IUrlsServices {
  execute({ originalUrl, id }: IUrl): Promise<string>
}
export interface IAuthServices {
  execute({ email, password }: IRequest): Promise<string>
}

export interface IUserServices {
  execute({
    name,
    email,
    password,
    confirmPassword,
  }: IUserRequest): Promise<User | void>
}
