"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    databaseURL: process.env.DATABASE_URL,
    port: process.env.PORT,
    hash: process.env.HASH,
    keyJWT: process.env.KEY_JWT,
    timeExpires: process.env.TIME_EXPIRES_IN,
};
