import { prismaClient as client } from '@client'
import { User } from '@prisma/client'

import * as ts from '@src/types/repositories'
import { IRanking, IUserCreate } from '@src/types/services'

export class UserRepository implements ts.IUserRepository {
  public find(data: ts.ITemplateUser): Promise<User | null> {
    return client.user.findUnique({
      where: {
        ...data,
      },
    })
  }
  public update(changes: ts.ITemplateUser, id: number): Promise<User> {
    return client.user.update({
      data: {
        ...changes,
      },
      where: {
        id,
      },
    })
  }
  public create({ name, email, password }: IUserCreate): Promise<User> {
    return client.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
  public view(data: ts.ITemplateUser) {
    return client.user.findUnique({
      where: {
        ...data,
      },
      select: {
        id: true,
        name: true,
        urls: {
          orderBy: {
            created_at: 'desc',
          },
          select: {
            id: true,
            shortened_url: true,
            original_url: true,
            visited_count: true,
          },
        },
      },
    })
  }
  public rank(): Promise<IRanking[]> {
    return client.$queryRaw`
      SELECT 
        users.id,
        name,
        SUM(
          COALESCE(urls.visited_count, 0)
        ) AS "visitCount",
        COUNT(urls.user_id) AS "linksCount"
      FROM 
        users
      LEFT JOIN 
        urls ON urls.user_id=users.id
      GROUP BY 
        users.id, urls.user_id
      ORDER BY 
        "visitCount" DESC,
        "linksCount" DESC,
        users.id ASC
      LIMIT 10;
    `
  }
}
