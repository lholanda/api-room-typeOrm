import { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../helpers/Api-errors";
import { UserService } from "../services/UserService";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: number;
  role: string;
};

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ForbiddenError("Token not provided.");
  }

  // quebro o token removendo o 'Bearer'
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

  const user = await UserService.findById(id);
  if (!user) {
    throw new UnauthorizedError("Invalid or expired token. Unauthorized user.");
  }
  //const { password: _p, role: _r, ...loggedUser } = user;

  next();
}

export async function adminAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ForbiddenError("Token not provided.");
  }

  // removendo o 'Bearer'
  const token = authorization.split(" ")[1];

  let jwtPass = process.env.JWT_PASS ?? '';

  const decoded = jwt.decode(token) as JwtPayload;

  if (decoded) {
    if (decoded.role != "ADMIN") {
      throw new UnauthorizedError("Invalid or expired token. Unauthorized user.");
    }
  }

  const { id } = jwt.verify(token, jwtPass) as JwtPayload;

  const user = await UserService.findById(id);
  if (!user) {
    throw new UnauthorizedError("Invalid or expired token. Unauthorized user.");
  }

  const { password: _p, role: _r, ...loggedUser } = user;

  console.log(loggedUser);

  next();
}
