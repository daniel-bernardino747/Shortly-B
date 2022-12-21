import { urlVerify } from 'src/constants/regexp.constants'

import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'

import * as ts from '@src/types/services'

import { UrlRepository } from '../repositories/urls.repositories'

export class URLsServices implements ts.IUrlsServices {
  private readonly urlRepo

  constructor() {
    this.urlRepo = new UrlRepository()
  }

  public async create({ originalUrl, id }: ts.IUrl): Promise<string> {
    const validUrl = urlVerify.test(originalUrl)
    if (!validUrl) throw new ClientError(msg.invalidURL)

    const shortUrl = this.generateCode()

    await this.urlRepo.create({
      user_id: id,
      shortened_url: shortUrl,
      original_url: originalUrl,
    })

    return shortUrl
  }
  public async viewOne({
    idParams,
  }: {
    idParams: string
  }): Promise<ts.IUrlToFront | null> {
    const id = Number(idParams)
    if (isNaN(id)) throw new ClientError(msg.paramsNotMatch)

    const dbUrl = await this.urlRepo.view({ id })
    if (!dbUrl) throw new ClientError(msg.urlNotFound)

    return {
      id,
      shortUrl: dbUrl.shortened_url,
      url: dbUrl.original_url,
    }
  }
  public async deleteOne({
    idParams,
    idUser,
  }: {
    idParams: string
    idUser: number
  }): Promise<void> {
    const id = Number(idParams)
    if (isNaN(id)) throw new ClientError(msg.paramsNotMatch)

    const existingUrl = await this.urlRepo.find({ id })
    if (!existingUrl) throw new ClientError(msg.urlNotFound)

    const isUrlOfUser = await this.urlRepo.find({ id, user_id: idUser })
    if (!isUrlOfUser) throw new ClientError(msg.urlAndUserNotMatch)

    const deletedUrl = await this.urlRepo.delete({ id })
    if (!deletedUrl) throw new ClientError(msg.urlNotFound)
  }
  public async openShortUrl({
    shortUrl,
  }: {
    shortUrl: string
  }): Promise<string | undefined> {
    const url = await this.urlRepo.increment({ shortened_url: shortUrl })
    if (!url) throw new ClientError(msg.urlNotFound)

    return url?.original_url
  }
  private generateCode() {
    let text = ''
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }
}
