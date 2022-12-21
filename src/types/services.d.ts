export interface IUserCreate {
  name: string
  email: string
  password: string
}
export interface IUrlCreate {
  user_id: number
  original_url: string
  shortened_url: string
}
export interface ILoginRequest {
  email: string
  password: string
}
export interface IUserRequest extends IUserCreate {
  confirmPassword: string
}
export interface IUrl {
  originalUrl: string
  id: number
}
export type IUrlToFront = {
  id: number
  shortUrl: string
  url: string
}
export interface IUserInfos {
  id: number
  name: string
  urls: {
    id: number
    shortened_url: string
    original_url: string
    visited_count: number
  }[]
}
export type IUser = {
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
export type IRanking = {
  id: number | undefined
  name: string | undefined
  linksCount: number | null
  visitCount: number | null
}
export interface ICreateShortUrl {
  userId: number
  originalUrl: string
  shortUrl: string
}

export interface IAuthServices {
  authLogin({ email, password }: IRequest): Promise<string | null>
}
export interface IUrlsServices {
  create({ originalUrl, id }: IUrl): Promise<string>
  viewOne({ idParams }: { idParams: string }): Promise<IUrlToFront | null>
  deleteOne({
    idParams,
    idUser,
  }: {
    idParams: string
    idUser: number
  }): Promise<void>
  openShortUrl({ shortUrl }: { shortUrl: string }): Promise<string | undefined>
}
export interface IUserServices {
  create({
    name,
    email,
    password,
    confirmPassword,
  }: IUserRequest): Promise<User | void>
  viewOne({ authUser }: { authUser: User }): Promise<IUserToFront | undefined>
  viewRanking(): Promise<IRankingToFront[] | undefined>
}
