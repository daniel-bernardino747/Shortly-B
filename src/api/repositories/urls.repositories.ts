import { prismaClient as client } from '@client'

import { ITemplateUrl, IUrlRepository } from '@src/types/repositories'
import { IUrlCreate } from '@src/types/services'

export class UrlRepository implements IUrlRepository {
  public find(data: ITemplateUrl) {
    return client.url.findUnique({
      where: {
        ...data,
      },
    })
  }
  public view(data: ITemplateUrl) {
    return client.url.findFirst({
      where: {
        ...data,
      },
      select: {
        id: true,
        shortened_url: true,
        original_url: true,
      },
    })
  }
  public create({ user_id, original_url, shortened_url }: IUrlCreate) {
    return client.url.create({
      data: {
        user_id,
        original_url,
        shortened_url,
      },
    })
  }
  public delete(data: ITemplateUrl) {
    return client.url.delete({
      where: {
        ...data,
      },
    })
  }
  public increment(data: ITemplateUrl) {
    return client.url.update({
      where: {
        ...data,
      },
      data: {
        visited_count: {
          increment: 1,
        },
      },
    })
  }
  public sumVisitedUrls(id: number) {
    return client.url.aggregate({
      _sum: {
        visited_count: true,
      },
      where: {
        user_id: id,
      },
    })
  }
}
