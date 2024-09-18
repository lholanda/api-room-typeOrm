import { Request, Response } from "express";
import { BadRequestError } from "../helpers/Api-errors";
import { SubjectService } from "../services/SubjectService";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    // biblioteca para validacao
    if (!name) {
      throw new BadRequestError("Name is required !!!");
    }
    const newSubject = await SubjectService.create(name);

    return res.status(201).json(newSubject);
  }

  async list(req: Request, res: Response) {
    const { id } = req.params;
    const _id = id ? Number(id) : 0;
   
    const subjects = await SubjectService.list( _id );
    return res.status(200).json(subjects);
  }
}


