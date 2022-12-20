import { urlVerify } from 'src/constants/regexp.constants'

import { prismaClient as client } from '@client'
import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'
import { ICreateShortUrl, IUrl, IUrlToFront } from '@types'

class URLsServices {
  public async execute({ originalUrl, id }: IUrl): Promise<string> {
    const validUrl = urlVerify.test(originalUrl)
    if (!validUrl) throw new ClientError(msg.invalidURL)

    const shortUrl = this.generateCode()

    await this.createUrl({
      userId: id,
      originalUrl,
      shortUrl,
    })

    return shortUrl
  }
  private async createUrl({ userId, originalUrl, shortUrl }: ICreateShortUrl) {
    return client.url.create({
      data: {
        user_id: userId,
        original_url: originalUrl,
        shortened_url: shortUrl,
      },
    })
  }
  public async viewOne({
    idParams,
  }: {
    idParams: string
  }): Promise<IUrlToFront | null> {
    const id = Number(idParams)
    if (isNaN(id)) throw new ClientError(msg.paramsNotMatch)

    const urlDB = await client.url.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        shortened_url: true,
        original_url: true,
      },
    })
    if (!urlDB) throw new ClientError(msg.urlNotFound)

    const url = {
      id,
      shortUrl: urlDB.shortened_url,
      url: urlDB.original_url,
    }
    return url
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

    const existingUrl = await client.url.findFirst({
      where: {
        id,
      },
    })
    if (!existingUrl) throw new ClientError(msg.urlNotFound)

    const isUrlOfUser = await client.url.findFirst({
      where: {
        id,
        user_id: idUser,
      },
    })
    if (!isUrlOfUser) throw new ClientError(msg.urlAndUserNotMatch)

    const deletedUrl = await client.url.delete({
      where: {
        id,
      },
    })
    if (!deletedUrl) throw new ClientError(msg.urlNotFound)
  }
  public generateCode() {
    let text = ''
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }
}
export { URLsServices }
