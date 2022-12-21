"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const urls_controllers_1 = require("@controllers/urls.controllers");
const auth_middlewares_1 = require("@middlewares/auth.middlewares");
const routes = express.Router();
const urlsController = new urls_controllers_1.URLsController();
routes.get('/urls/:id', urlsController.view);
routes.delete('/urls/:id', auth_middlewares_1.ensureAuthenticate, urlsController.delete);
routes.post('/url/shorten', auth_middlewares_1.ensureAuthenticate, urlsController.create);
routes.get('/urls/open/:shortUrl', urlsController.redirect);
exports.default = routes;