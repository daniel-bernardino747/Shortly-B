"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
class ClientError extends Error {
    constructor({ status, message }, ...params) {
        super(...params);
        this.status = status;
        this.message = message;
    }
}
exports.ClientError = ClientError;
