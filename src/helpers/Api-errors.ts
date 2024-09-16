// classe de error ApiError extendida de Error
export class ApiError extends Error {
    public readonly statusCode: number;
        constructor(message: string, statusCode: number) {
        super(message)
        //console.log(statusCode)
        this.statusCode = statusCode
    }
}

export class BadRequestError extends ApiError{
    constructor(message: string){
        //message = message.length > 0 ? message : 'Bad Request Error !!!'
        super(message, 400)
    }
}

export class UnauthorizedError extends ApiError{
    constructor(message: string){
        super(message, 401)
    }
}

export class PaymentRequiredError extends ApiError{
    constructor(message: string){
        super(message, 402)
    }
}

export class NotFoundError extends ApiError{
    constructor(message: string){
        super(message, 404)
    }
}

export class FkFoundError extends ApiError{
    constructor(message: string){
        super(message, 400)
    }
}
