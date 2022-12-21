import { Request, Response } from 'express'

export interface IAuthController {
  login(request: Request, response: Response)
}
export interface IUserController {
  view(request: Request, response: Response)
  create(request: Request, response: Response)
  ranking(request: Request, response: Response)
}
export interface IUrlController {
  view(request: Request, response: Response)
  create(request: Request, response: Response)
  delete(request: Request, response: Response)
  redirect(request: Request, response: Response)
}
