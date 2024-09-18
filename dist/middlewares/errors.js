"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    console.log('---!!!! ----- errors.ts--------> ', error.message);
    // aqui compoe uma msg explicita para a aplicacao
    const statusCode = error.statusCode ? error.statusCode : 500;
    const message = error.statusCode ?
        error.message :
        'Internal server error !!!';
    return res.status(statusCode).json({ message });
};
exports.errorMiddleware = errorMiddleware;
// {message: message} = { message }
// Middleware de errors separado para ser acionado a qualquer momento
