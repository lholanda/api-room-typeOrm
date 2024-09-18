"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectService = void 0;
const subjectRepository_1 = require("../repositories/subjectRepository");
class SubjectService {
    static async create(name) {
        const newSubject = subjectRepository_1.subjectRepository.create({ name });
        return await subjectRepository_1.subjectRepository.save(newSubject);
    }
    // service find
    static async list(id) {
        let filtro = {};
        if (id != 0) {
            filtro = ` id = ${id} `;
        }
        return await subjectRepository_1.subjectRepository
            .createQueryBuilder("subjects")
            .where(filtro)
            .orderBy("subjects.id")
            .getMany();
    }
}
exports.SubjectService = SubjectService;
