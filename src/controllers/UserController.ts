import { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  FkFoundError
} from "../helpers/Api-errors";
import { UserService } from "../services/UserService";

export class UserController {

  // inserir Rooms
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    
    const usersExist = await UserService.findByEmail(email);

    if (usersExist) {
      throw new BadRequestError("Email already registered. If you already have an account, please log in.");
    }

    const newPassword = '3@'+password+'_j'
    const newUser = await UserService.create(name, email, newPassword);

    return res.status(201).json(newUser);
  }
}

