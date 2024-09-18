"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectController = void 0;
const Api_errors_1 = require("../helpers/Api-errors");
const SubjectService_1 = require("../services/SubjectService");
class SubjectController {
    async create(req, res) {
        const { name } = req.body;
        // biblioteca para validacao
        if (!name) {
            throw new Api_errors_1.BadRequestError("name is required !!!");
        }
        const newSubject = await SubjectService_1.SubjectService.create(name);
        return res.status(201).json(newSubject);
    }
    async list(req, res) {
        const { id } = req.params;
        const iid = id ? Number(id) : 0;
        const subjects = await SubjectService_1.SubjectService.list(iid);
        return res.status(200).json(subjects);
    }
}
exports.SubjectController = SubjectController;
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
