"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLsServices = void 0;
const regexp_constants_1 = require("src/constants/regexp.constants");
const errors_helpers_1 = require("@helpers/errors.helpers");
const _messages_1 = require("@messages");
const urls_repositories_1 = require("../repositories/urls.repositories");
class URLsServices {
    constructor() {
        this.urlRepo = new urls_repositories_1.UrlRepository();
    }
    async create({ originalUrl, id }) {
        const validUrl = regexp_constants_1.urlVerify.test(originalUrl);
        if (!validUrl)
            throw new errors_helpers_1.ClientError(_messages_1.default.invalidURL);
        const shortUrl = this.generateCode();
        await this.urlRepo.create({
            user_id: id,
            shortened_url: shortUrl,
            original_url: originalUrl,
        });
        return shortUrl;
    }
    async viewOne({ idParams, }) {
        const id = Number(idParams);
        if (isNaN(id))
            throw new errors_helpers_1.ClientError(_messages_1.default.paramsNotMatch);
        const dbUrl = await this.urlRepo.view({ id });
        if (!dbUrl)
            throw new errors_helpers_1.ClientError(_messages_1.default.urlNotFound);
        return {
            id,
            shortUrl: dbUrl.shortened_url,
            url: dbUrl.original_url,
        };
    }
    async deleteOne({ idParams, idUser, }) {
        const id = Number(idParams);
        if (isNaN(id))
            throw new errors_helpers_1.ClientError(_messages_1.default.paramsNotMatch);
        const existingUrl = await this.urlRepo.find({ id });
        if (!existingUrl)
            throw new errors_helpers_1.ClientError(_messages_1.default.urlNotFound);
        const isUrlOfUser = await this.urlRepo.find({ id, user_id: idUser });
        if (!isUrlOfUser)
            throw new errors_helpers_1.ClientError(_messages_1.default.urlAndUserNotMatch);
        const deletedUrl = await this.urlRepo.delete({ id });
        if (!deletedUrl)
            throw new errors_helpers_1.ClientError(_messages_1.default.urlNotFound);
    }
    async openShortUrl({ shortUrl, }) {
        const url = await this.urlRepo.increment({ shortened_url: shortUrl });
        if (!url)
            throw new errors_helpers_1.ClientError(_messages_1.default.urlNotFound);
        return url?.original_url;
    }
    generateCode() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}
exports.URLsServices = URLsServices;
