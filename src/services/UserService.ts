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

}