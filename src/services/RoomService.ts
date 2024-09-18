import { AppDataSource } from "../data-source";
import { Room } from "../entities/Room";
import { NotFoundError } from "../helpers/Api-errors";
import { roomRepository } from "../repositories/roomRepository";
import { subjectRepository } from "../repositories/subjectRepository";

export class RoomService {
  // service create
  static async create(name: string, description: string, code: string) {
    const newRoom = roomRepository.create({ name, description, code });

    return await roomRepository.save(newRoom);
  }

  // service create
  static async createRoomSubject(roomId: number, subjectId: number) {
    //const room = await roomRepository.findOneBy({ id: room_id });
    const room = await roomRepository.findOne({
      where: { id: roomId },
      relations: ['subjects'],
    });
  
    
    if (!room) {
      throw new NotFoundError(`Room not found (room_id = ${roomId} )`);
    }

    const subject = await subjectRepository.findOneBy({ id: subjectId });



    if (!subject) {
      throw new NotFoundError(`Subject not found (subject_id = ${subjectId} )`);
    }

    let newRs = {};
    if (room && subject) {
      room.subjects.push(subject);

      newRs = await roomRepository.save(room); // Isso automaticamente atualizará a tabela ternária
    }  
   
    return newRs
 
  }

   // service create
   static async deleteRoomSubject(room_id: number, subject_id: number) {

    const room = await roomRepository.findOneBy({ id: room_id });
    if (!room) {
      throw new NotFoundError(`Room not found (room_id = ${room_id} )`);
    }

    const subject = await subjectRepository.findOneBy({ id: subject_id });


    if (!subject) {
      throw new NotFoundError(`Subject not found (subject_id = ${subject_id} )`);
    }

    const _sid = Number(subject.id) 
    
    return await roomRepository.delete(room.id )
 
  }

  static async removeRoomSubject(roomId: number, subjectId: number) {
    const roomRepository = AppDataSource.getRepository(Room);
  
    const room = await roomRepository.findOne({
      where: { id: roomId },
      relations: ['subjects'],
    });
  
    if (room) {
      room.subjects = room.subjects.filter((subject) => subject.id !== subjectId);
      await roomRepository.save(room); // Atualiza a tabela ternária automaticamente
    }
  }



/*
  static async create(title: string, url: string, room_id: number) {

    const room = await roomRepository.findOneBy({ id: room_id });
    // pode ser cadastrado sem room (0,n)
    if (!room) {
      throw new NotFoundError(`Room not found (room_id = ${room_id} )`);
    }

    const newVideo = videoRepository.create({ title, url, room });
    return await videoRepository.save(newVideo);
  }
*/

  // service find
  static async delete(id: number) {
    return await roomRepository.delete(id);
  }


  // service find
  static async list(id: number) {
    let filtro: any = {};
    if (id != 0) {
      filtro = ` id = ${id} `;
    }
    
    return await roomRepository
    .createQueryBuilder("room")
    .where(filtro)
    .orderBy("room.id")
    .getMany();
  }
  
  // service find
  static async findById(id: number) {
    return await roomRepository.findOneBy({ id });
  }

  // service find
  static async find(id: number) {
    return await roomRepository.find({ where: { id } });
  }

}

// // service list
// static async list(id: number) {
//   let filtro: any = { cache: 3000 };
//   if (id === 0) {
//     filtro = { cache: 3000 };
//   } else {
//     filtro = { where: { id: id }, cache: 6000 };
//   }

//   return await roomRepository.find(filtro);
// }
