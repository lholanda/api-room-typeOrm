import { userRepository } from "../repositories/userRepository";

export class UserService{

  // service find
  static async findByEmail(email: string) {
    return await userRepository.findOneBy({ email });
  }

  static async create(name: string, email: string, password: string) {
    
    const newUser = userRepository.create({ name, email, password });
    return await userRepository.save(newUser);
  }

  // service find
  static async list(id: number) {
    let filtro: string = (id != 0) ? ` id = ${id} `: ``;
    // retirar a password de user, selecionando apenas id, name e email
    return await userRepository
                  .createQueryBuilder("user")
                  .select([
                    "user.id", 
                    "user.name", 
                    "user.email"
                  ])
                  .where(filtro)
                  .orderBy("user.id")
                  .getMany();
  }

}