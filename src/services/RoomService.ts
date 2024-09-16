import { AppDataSource } from "../data-source";
import { Room } from "../entities/Room";
import { roomRepository } from "../repositories/roomRepository";

export class RoomService {

  // service create
  static async create(name: string, description: string, code: string) {
    const newRoom = roomRepository.create({ name, description, code });

    return await roomRepository.save(newRoom);
  }

  // service find 
  static async delete( id: number ){
    return await roomRepository.delete(id);
  }

 
  // service list
  static async list(id: number) {
    let filtro:any = {cache : 3000 };
    if(id === 0){
      filtro = {cache : 3000 };
    } else {
      filtro = {where: {id: id}, cache : 6000 };
    }

    return await roomRepository.find(filtro);
  }

  

 // service find 
 static async find( id: number ){
  return await roomRepository.find({where: {id}});
}


}
