"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    emailUnavailable: {
        status: 409,
        message: 'An account with this email already exists.',
    },
    bodyNotMatch: {
        status: 422,
        message: 'The information in the body does not match.',
    },
    paramsNotMatch: {
        status: 422,
        message: 'The information in the parameters is incorrect.',
    },
    urlAndUserNotMatch: {
        status: 401,
        message: 'Unable to delete a url that is not yours.',
    },
    invalidLogin: {
        status: 401,
        message: 'Incorrect email or password.',
    },
    invalidHeader: {
        status: 401,
        message: 'Authorization header was not informed.',
    },
    urlNotFound: {
        status: 404,
        message: 'Could not find this url.',
    },
    userNotFound: {
        status: 404,
        message: 'Could not find this user.',
    },
    invalidEmail: {
        status: 422,
        message: 'Provide a valid email.',
    },
    invalidURL: {
        status: 422,
        message: 'Provide a valid url.',
    },
};
