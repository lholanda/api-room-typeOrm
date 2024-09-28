import { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  FkFoundError
} from "../helpers/Api-errors";
import { UserService } from "../services/UserService";
import bcrypt from 'bcrypt'

export class UserController {

  // inserir Rooms
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    
    const usersExist = await UserService.findByEmail(email);

    if (usersExist) {
      throw new BadRequestError("Email already registered. If you already have an account, please log in.");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await UserService.create(name, email, hashPassword);
   
    // tirar a password de dentro do newUser e todo o restante coloca na constante user - antes de retornar 
    const {password: _p, ...user} = newUser;

    return res.status(201).json(user);
  }

  async list(req: Request, res: Response) {
    const { id } = req.params;
    const _id = id ? Number(id) : 0;
   
    const users = await UserService.list( _id );
    return res.status(200).json(users);
  }



}

