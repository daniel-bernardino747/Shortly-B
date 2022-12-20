import { User } from '@prisma/client'

export interface IUrl {
  originalUrl: string
  id: number
}
export type IUrlToFront = {
  id: number
  shortUrl: string
  url: string
}
export type IUserToFront = {
  id: number | undefined
  name: string | undefined
  visitCount: number | null
  shortenedUrls:
    | {
        id: number
        visited_count: number
        shortened_url: string
        original_url: string
      }[]
    | undefined
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
  viewOne({ idParams }: { idParams: string }): Promise<IUrlToFront | null>
  deleteOne({
    idParams,
    idUser,
  }: {
    idParams: string
    idUser: number
  }): Promise<void>
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
  getMe({ user }: { user: User }): Promise<IUserToFront | undefined>
}
