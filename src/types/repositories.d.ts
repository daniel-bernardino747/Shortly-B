import { User } from '@prisma/client'

import { IRankingToFront, IUrlCreate } from '@src/types/services'

export interface ITemplateUser {
  id?: number
  name?: string
  email?: string
  password?: string
  token?: string | null
}
export interface ITemplateUrl {
  id?: number
  user_id?: number
  shortened_url?: string
  original_url?: string
  visited_url?: number
  created_at?: string
}
export interface IUserRepository {
  find(data: ITemplateUser): Promise<User | null>
  update(changes: ITemplateUser, id: number): Promise<User>
  create({ name, email, password }: IUserCreate): Promise<User>
  rank(): Promise<IRankingToFront[]>
}
export interface IUrlRepository {
  view(data: ITemplateUrl)
  sumVisitedUrls(id: number)
  create({ user_id, original_url, shortened_url }: IUrlCreate)
  increment(data: ITemplateUrl)
}
