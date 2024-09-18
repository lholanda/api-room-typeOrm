// videoService.ts
import { videoRepository } from "../repositories/videoRepository";
import { roomRepository } from "../repositories/roomRepository";
import { NotFoundError } from "../helpers/Api-errors";
import { Room } from "../entities/Room";

export class VideoService {
  static async create(title: string, url: string, room_id: number) {

    const room = await roomRepository.findOneBy({ id: room_id });
    // pode ser cadastrado sem room (0,n)
    if (!room) {
      throw new NotFoundError(`Room not found (room_id = ${room_id} )`);
    }

    const newVideo = videoRepository.create({ title, url, room });
    return await videoRepository.save(newVideo);
  }


  // service find
  static async delete(id: number) {
    return await videoRepository.delete(id);
  }


  // service find
  static async list(id: number) {
    let filtro: any = {};
    if (id != 0) {
      filtro = ` video.id = ${id} `;
    }
    return await videoRepository
      .createQueryBuilder("video")
      .leftJoinAndSelect("video.room", "room") // Faz a junção com a entidade 'Room'
      .select([
        "video.id",
        "video.title",
        "video.url",
        "room.id",
        "room.name",
        "room.description",
        "room.code", // Selecionando o campo relacionado da entidade Room
      ])
      .where(filtro, { id })
      .orderBy("video.id", "ASC")
      .getMany();
  }





  // service find
  static async findById(id: number) {
    return await videoRepository.findOneBy({ id });
  }


  // utilizado em RoomService para verificar se existe a room usada em video cadastrada em room- para evitar apagar
  static async findByRoom(room_fk: number) {
    console.log("aqui");
    return await videoRepository
      .createQueryBuilder("video")
      .where("video.room_fk = :room_fk", { room_fk: room_fk })
      .getOne();
  }

  static async findByRoom2(room_fk: number) {
    return await videoRepository
      .createQueryBuilder("video")
      .leftJoinAndSelect("video.room", "room") // Faz a junção com a entidade 'Room'
      .select([
        "video.id",
        "video.title",
        "video.url",
        "room.id",
        "room.name",
        "room.description",
        "room.code", // Selecionando o campo relacionado da entidade Room
      ])
      .where("video.room_fk = :room_fk", { room_fk: room_fk })
      .getMany();
  }


}
