import { subjectRepository } from "../repositories/subjectRepository";

export class SubjectService {
    
  static async create(name: string) {
        
      const newSubject = subjectRepository.create({name});

      return await subjectRepository.save(newSubject);
    }
  }

