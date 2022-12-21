"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_routes_1 = require("./auth.routes");
const urls_routes_1 = require("./urls.routes");
const users_routes_1 = require("./users.routes");
const routes = express.Router();
routes.use(auth_routes_1.default).use(urls_routes_1.default).use(users_routes_1.default);
exports.default = routes;
