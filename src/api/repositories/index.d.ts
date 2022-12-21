import { User } from '@prisma/client'
export interface IUserRepository {
  findUser(email: string): Promise<User | null>
  updateUser(changes: I.UpdateUser, id: number): Promise<User>
  // createToken(idUser: string): Promise<string | null>
}
export interface IUpdateUser {
  id?: number
  name?: string
  email?: string
  password?: string
  token?: string | null
}
