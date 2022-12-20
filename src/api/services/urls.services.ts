import { urlVerify } from 'src/constants/regexp.constants'

import { prismaClient as client } from '@client'
import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'

interface IUrl {
  originalUrl: string
  id: number
}
interface ICreateShortUrl {
  userId: number
  originalUrl: string
  shortUrl: string
}

class URLsServices {
  async execute({ originalUrl, id }: IUrl) {
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
  createUrl({ userId, originalUrl, shortUrl }: ICreateShortUrl) {
    return client.url.create({
      data: {
        user_id: userId,
        original_url: originalUrl,
        shortened_url: shortUrl,
      },
    })
  }
  generateCode() {
    let text = ''
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }
}
export { URLsServices }
