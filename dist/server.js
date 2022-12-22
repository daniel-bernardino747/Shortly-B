"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const _config_1 = require("./config");
const _routes_1 = require("./routes");
dotenv.config();
const app = express();
app.use(cors()).use(express.json()).use(_routes_1.default);
const port = _config_1.default.port || 3333;
app.listen(port, () => {
    console.log(`🌀 started server in door: ${port}`);
});
