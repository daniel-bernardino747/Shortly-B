"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_services_1 = require("../services/users.services");
const errors_helpers_1 = require("../../helpers/errors.helpers");
const userServices = new users_services_1.UserServices();
class UserController {
    async view(request, response) {
        try {
            const authUser = response.locals.user;
            const user = await userServices.viewOne({ authUser });
            return response.status(200).send({ ...user });
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
        try {
            const { name, email, password, confirmPassword } = request.body;
            await userServices.create({
                name,
                email,
                password,
                confirmPassword,
            });
            return response.sendStatus(201);
        }
        catch (e) {
            if (e instanceof errors_helpers_1.ClientError) {
                return response.status(e.status).send({ error: { ...e } });
            }
            console.error(e);
            return response.status(500).send({ error: e });
        }
    }
    async ranking(request, response) {
        try {
            const ranking = await userServices.viewRanking();
            return response.status(200).send({ ranking });
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
exports.UserController = UserController;
