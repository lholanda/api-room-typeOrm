import { Request, Response } from "express";
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError
} from "../helpers/Api-errors";
import { UserService } from "../services/UserService";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: number
}

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
    let jwtPass = process.env.JWT_PASS ?? '';

    const token = jwt.sign({id: user.id, role: user.role}, jwtPass, {expiresIn: '8h'})

    const {password: _p, role: _r,...userLogin} = user;

    return res.status(200).json({
        user: userLogin,
        token: token,
    });
  }

  async rotaQualquer(req: Request, res: Response) {
    return res.status(200).json('entrou na rota Profile');
  }


}