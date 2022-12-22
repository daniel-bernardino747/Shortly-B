"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlRepository = void 0;
const _client_1 = require("../../prisma/prisma.client");
class UrlRepository {
    find(data) {
        return _client_1.prismaClient.url.findFirst({
            where: {
                ...data,
            },
        });
    }
    view(data) {
        return _client_1.prismaClient.url.findFirst({
            where: {
                ...data,
            },
            select: {
                id: true,
                shortened_url: true,
                original_url: true,
            },
        });
    }
    create({ user_id, original_url, shortened_url }) {
        return _client_1.prismaClient.url.create({
            data: {
                user_id,
                original_url,
                shortened_url,
            },
        });
    }
    delete(data) {
        return _client_1.prismaClient.url.delete({
            where: {
                ...data,
            },
        });
    }
    increment(data) {
        return _client_1.prismaClient.url.update({
            where: {
                ...data,
            },
            data: {
                visited_count: {
                    increment: 1,
                },
            },
        });
    }
    sumVisitedUrls(id) {
        return _client_1.prismaClient.url.aggregate({
            _sum: {
                visited_count: true,
            },
            where: {
                user_id: id,
            },
        });
    }
}
exports.UrlRepository = UrlRepository;
