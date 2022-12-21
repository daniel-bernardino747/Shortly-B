"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const _client_1 = require("@client");
class UserRepository {
    find(data) {
        return _client_1.prismaClient.user.findUnique({
            where: {
                ...data,
            },
        });
    }
    update(changes, id) {
        return _client_1.prismaClient.user.update({
            data: {
                ...changes,
            },
            where: {
                id,
            },
        });
    }
    create({ name, email, password }) {
        return _client_1.prismaClient.user.create({
            data: {
                name,
                email,
                password,
            },
        });
    }
    view(data) {
        return _client_1.prismaClient.user.findUnique({
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
        });
    }
    rank() {
        return _client_1.prismaClient.$queryRaw `
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
    `;
    }
}
exports.UserRepository = UserRepository;
