import { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError
} from "../helpers/Api-errors";
import { UserService } from "../services/UserService";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export class LoginController {
  // inserir Rooms
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // verificar se existe usuario (email) e se a senha armazenada esta a mesma do bd
    const user = await UserService.findByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid credentials. Please check your email and password.");
    }

    const verifyPassword = await bcrypt.compare(password, user.password)

    if(!verifyPassword){
        throw new BadRequestError("Invalid credentials. Please check your email and password.");
    }
    // se passar da verificacao de email/senha, criar o com token JWT
    const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: '8h'})

    const {password: _, ...userLogin} = user;

    return res.status(200).json({
        user: userLogin,
        token: token,
    });
  }
}