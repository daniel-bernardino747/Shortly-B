export interface IAuthServices {
  authLogin({ email, password }: IRequest): Promise<string | null>
}
export interface ILoginRequest {
  email: string
  password: string
}
