import { Request, Response } from "express";
import { BadRequestError } from "../helpers/Api-errors";
import { SubjectService } from "../services/SubjectService";
import { AppDataSource } from "../data-source";
import { Subject } from "../entities/Subject";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    // biblioteca para validacao
    if (!name) {
      throw new BadRequestError("name is required !!!");
    }
    const newSubject = await SubjectService.create(name);
    return res.status(201).json(newSubject);
  }

  async list(req: Request, res: Response) {
    const subjects = await AppDataSource.manager.find(Subject);
    return res.status(200).json(subjects);
  }
}

/*
export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description, code } = req.body;

    if (!name) {
      throw new BadRequestError("name is required !!!");
    }

    const newRoom = await RoomService.create(name, description, code );
    return res.status(201).json(newRoom);
  }
}
*/
