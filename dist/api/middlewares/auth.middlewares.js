"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticate = void 0;
const _client_1 = require("@client");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("@config");
const errors_helpers_1 = require("@helpers/errors.helpers");
const _messages_1 = require("@messages");
async function ensureAuthenticate(request, response, next) {
    try {
        const authToken = request.headers.authorization;
        if (!authToken)
            throw new errors_helpers_1.ClientError(_messages_1.default.invalidHeader);
        const token = authToken?.replace('Bearer ', '');
        (0, jsonwebtoken_1.verify)(token, _config_1.default.keyJWT);
        const userLogged = await _client_1.prismaClient.user.findFirst({
            where: {
                token,
            },
        });
        if (!userLogged)
            throw new errors_helpers_1.ClientError(_messages_1.default.userNotFound);
        response.locals.user = userLogged;
    }
    catch (e) {
        if (e instanceof errors_helpers_1.ClientError) {
            return response.status(e.status).send({ error: { ...e } });
        }
        if (e instanceof jsonwebtoken_1.TokenExpiredError) {
            return response.status(410).send({ error: { ...e } });
        }
        if (e instanceof jsonwebtoken_1.JsonWebTokenError) {
            return response.status(401).send({ error: { ...e } });
        }
        if (e instanceof SyntaxError) {
            return response.status(401).send({ error: 'Invalid syntax.' });
        }
        console.error(e);
        return response.status(500).send({ error: e });
    }
    return next();
}
exports.ensureAuthenticate = ensureAuthenticate;
