import { urlVerify } from 'src/constants/regexp.constants'

import { prismaClient as client } from '@client'
import { ClientError } from '@helpers/errors.helpers'
import msg from '@messages'
import { ICreateShortUrl, IUrl } from '@types'

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
