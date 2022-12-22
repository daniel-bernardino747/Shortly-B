"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_services_1 = require("../services/auth.services");
const errors_helpers_1 = require("../../helpers/errors.helpers");
const authServices = new auth_services_1.AuthServices();
class AuthController {
    async login(request, response) {
        try {
            const { email, password } = request.body;
            const token = await authServices.authLogin({
                email,
                password,
            });
            return response.status(200).send({ token });
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
exports.AuthController = AuthController;
