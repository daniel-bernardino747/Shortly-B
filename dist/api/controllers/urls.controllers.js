"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLsController = void 0;
const errors_helpers_1 = require("@helpers/errors.helpers");
const urls_services_1 = require("../services/urls.services");
const urlsServices = new urls_services_1.URLsServices();
class URLsController {
    async view(request, response) {
        try {
            const idParams = request.params.id;
            const url = await urlsServices.viewOne({ idParams });
            return response.status(200).send({ ...url });
        }
        catch (e) {
            if (e instanceof errors_helpers_1.ClientError) {
                return response.status(e.status).send({ error: { ...e } });
            }
            console.error(e);
            return response.status(500).send({ error: e });
        }
    }
    async create(request, response) {
        const user = response.locals.user;
        try {
            const { url: originalUrl } = request.body;
            const shortUrl = await urlsServices.create({
                originalUrl,
                id: user.id,
            });
            return response.status(201).send({ shortUrl });
        }
        catch (e) {
            if (e instanceof errors_helpers_1.ClientError) {
                return response.status(e.status).send({ error: { ...e } });
            }
            console.error(e);
            return response.status(500).send({ error: e });
        }
    }
    async delete(request, response) {
        try {
            const idParams = request.params.id;
            const { id: idUser } = response.locals.user;
            await urlsServices.deleteOne({ idParams, idUser });
            return response.sendStatus(204);
        }
        catch (e) {
            if (e instanceof errors_helpers_1.ClientError) {
                return response.status(e.status).send({ error: { ...e } });
            }
            console.error(e);
            return response.status(500).send({ error: e });
        }
    }
    async redirect(request, response) {
        try {
            const shortUrl = request.params.shortUrl;
            const originalUrl = await urlsServices.openShortUrl({ shortUrl });
            return response.redirect(originalUrl);
        }
        catch (e) {
            if (e instanceof errors_helpers_1.ClientError) {
                return response.status(e.status).send({ error: { ...e } });
            }
            console.error(e);
            return response.status(500).send({ error: e });
        }
    }
}
exports.URLsController = URLsController;
