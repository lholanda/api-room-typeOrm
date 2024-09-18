import { subjectRepository } from "../repositories/subjectRepository";

export class SubjectService {
  
  // service create
  static async create(name: string) {

    const newSubject = subjectRepository.create({ name });
    console.log(newSubject);
    
    
    return await subjectRepository.save(newSubject);
  }

  // service find
  static async list(id: number) {
    let filtro: any = {};
    if (id != 0) {
      filtro = ` id = ${id} `;
    }

    return await subjectRepository
                  .createQueryBuilder("subjects")
                  .where(filtro)
                  .orderBy("subjects.id")
                  .getMany();
  }
}
