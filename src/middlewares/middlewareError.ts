import { Request, Response, NextFunction } from "express";
import { ApiError } from "../helpers/Api-errors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('---!!!! ----- errors.ts--------> ', error.message)
  // aqui compoe uma msg explicita para a aplicacao
  const statusCode = error.statusCode ? error.statusCode :  500
  const message = 
    error.statusCode ? 
    error.message : 
    'Internal server error !!!'
  
  
  return res.status(statusCode).json({ message });
};


// {message: message} = { message }

// Middleware de errors separado para ser acionado a qualquer momento