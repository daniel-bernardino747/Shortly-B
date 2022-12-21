"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("@config");
const regexp_constants_1 = require("@constants/regexp.constants");
const errors_helpers_1 = require("@helpers/errors.helpers");
const _messages_1 = require("@messages");
const urls_repositories_1 = require("../repositories/urls.repositories");
const users_repositories_1 = require("../repositories/users.repositories");
class UserServices {
    constructor() {
        this.usersRepo = new users_repositories_1.UserRepository();
        this.urlsRepo = new urls_repositories_1.UrlRepository();
    }
    async create({ name, email, password, confirmPassword, }) {
        const bodyIncorrect = !name ||
            !email ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword;
        if (bodyIncorrect)
            throw new errors_helpers_1.ClientError(_messages_1.default.bodyNotMatch);
        const validEmail = regexp_constants_1.emailVerify.test(email);
        if (!validEmail)
            throw new errors_helpers_1.ClientError(_messages_1.default.invalidEmail);
        const userExists = await this.usersRepo.find({ email });
        if (userExists)
            throw new errors_helpers_1.ClientError(_messages_1.default.emailUnavailable);
        await this.createUser({ name, email, password });
    }
    async viewOne({ authUser, }) {
        const dbUser = await this.usersRepo.view({ id: authUser.id });
        const { id, name, urls } = dbUser;
        const { _sum: { visited_count: visitCount }, } = await this.urlsRepo.sumVisitedUrls(authUser.id);
        return {
            id,
            name,
            visitCount,
            shortenedUrls: urls,
        };
    }
    async viewRanking() {
        const dbRanking = await this.usersRepo.rank();
        const ranking = dbRanking.map((value) => {
            return {
                ...value,
                linksCount: Number(value.linksCount),
                visitCount: Number(value.visitCount),
            };
        });
        return ranking;
    }
    async createUser(newUser) {
        const passwordHash = await (0, bcryptjs_1.hash)(newUser.password, Number(_config_1.default.hash));
        const user = await this.usersRepo.create({
            name: newUser.name,
            email: newUser.email.toLowerCase(),
            password: passwordHash,
        });
        const firstToken = (0, jsonwebtoken_1.sign)({}, _config_1.default.keyJWT, {
            subject: user.id.toString(),
            expiresIn: _config_1.default.timeExpires,
        });
        await this.usersRepo.update({ token: firstToken }, user.id);
        return user;
    }
}
exports.UserServices = UserServices;
