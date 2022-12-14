"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_controllers_1 = require("../api/controllers/auth.controllers");
const users_controllers_1 = require("../api/controllers/users.controllers");
const routes = express.Router();
const userController = new users_controllers_1.UserController();
const authController = new auth_controllers_1.AuthController();
routes.post('/signup', userController.create);
routes.post('/signin', authController.login);
exports.default = routes;
