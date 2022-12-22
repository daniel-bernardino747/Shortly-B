"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("../../config");
const regexp_constants_1 = require("../../constants/regexp.constants");
const errors_helpers_1 = require("../../helpers/errors.helpers");
const _messages_1 = require("../../constants/messages.constants");
const users_repositories_1 = require("../repositories/users.repositories");
class AuthServices {
    constructor() {
        this.UserRepo = new users_repositories_1.UserRepository();
    }
    async authLogin({ email, password, }) {
        if (!email && !password)
            throw new errors_helpers_1.ClientError(_messages_1.default.bodyNotMatch);
        const validEmail = regexp_constants_1.emailVerify.test(email);
        if (!validEmail)
            throw new errors_helpers_1.ClientError(_messages_1.default.invalidEmail);
        const userExists = await this.UserRepo.find({ email });
        if (!userExists)
            throw new errors_helpers_1.ClientError(_messages_1.default.invalidLogin);
        const passwordMatch = await (0, bcryptjs_1.compare)(password, userExists.password);
        if (!passwordMatch)
            throw new errors_helpers_1.ClientError(_messages_1.default.invalidLogin);
        return this.createToken(userExists.id.toString());
    }
    async createToken(idUser) {
        const token = (0, jsonwebtoken_1.sign)({}, _config_1.default.keyJWT, {
            subject: idUser,
            expiresIn: _config_1.default.timeExpires,
        });
        await this.UserRepo.update({ token }, Number(idUser));
        return token;
    }
}
exports.AuthServices = AuthServices;
