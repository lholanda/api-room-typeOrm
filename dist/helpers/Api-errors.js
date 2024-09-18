"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FkFoundError = exports.NotFoundError = exports.PaymentRequiredError = exports.UnauthorizedError = exports.BadRequestError = exports.ApiError = void 0;
// classe de error ApiError extendida de Error
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        console.log('---------apiError---------');
    }
}
exports.ApiError = ApiError;
class BadRequestError extends ApiError {
    constructor(message) {
        //message = message.length > 0 ? message : 'Bad Request Error !!!'
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class PaymentRequiredError extends ApiError {
    constructor(message) {
        super(message, 402);
    }
}
exports.PaymentRequiredError = PaymentRequiredError;
class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class FkFoundError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}
exports.FkFoundError = FkFoundError;
