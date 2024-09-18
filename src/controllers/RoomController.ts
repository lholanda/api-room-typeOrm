import { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  FkFoundError
} from "../helpers/Api-errors";
import { RoomService } from "../services/RoomService";
import { VideoService } from "../services/VideoService";
import { Room } from "../entities/Room";
import { error } from "console";
import { Or } from "typeorm";
import { subscribe } from "diagnostics_channel";

export class RoomController {

  // inserir Rooms
  async create(req: Request, res: Response) {
    const { name, description, code } = req.body;

    if (!name) {
      throw new BadRequestError("name is required !!!");
    }

    const newRoom = await RoomService.create(name, description, code);
    return res.status(201).json(newRoom);
  }


  //--------------------------------------------------------------------
  // Exclui Room, verifica se pode apagar pois 
  // rooms.id é usado como chave estrangeira na tabela de videos
  // -------------------------------------------------------------------
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    //const room = await RoomService.find( Number(id) );
    const room = await RoomService.findById(Number(id));
    if (!room) {
      throw new NotFoundError(`Room not found ( id = ${id} )`);
    }

    const video = await VideoService.findByRoom( room.id );
    if (video) {
      throw new FkFoundError(
        `Foreign key violation found in the videos table (id = ${video.id}). This deletion is not possible !!!`
      );
    }

    const msgResult = await RoomService.delete(Number(id));

    return res.status(204).json();
  }

  // Listagem de Room
  async list(req: Request, res: Response) {
    const { id } = req.params;
    const _id = id ? Number(id) : 0;

    const rooms = await RoomService.list( _id );

    return res.status(200).json(rooms);
  }


  // cadastra um video vinculando-o a uma Room
  async createRoomSubject(req: Request, res: Response) {
    const { sid , rid} = req.params;

    if ((!sid) || (!rid)) {
      throw new BadRequestError("subject_id or room_id is missing !!!");
    }
    const _room_id    = rid ? Number(rid) : 0;
    const _subject_id = sid ? Number(sid) : 0;

    const newRS = await RoomService.createRoomSubject( _room_id , _subject_id );

    console.log(newRS);
    
    //const _newRS = { room: {id: newRS.id, name: newRS.name, code: newRS.code}, subject: {id: newRS.subjects[0].id, name: newRS.subjects[0].name}} ;
    
    return res.status(200).json(newRS);
  }

  // cadastra um video vinculando-o a uma Room
  async deleteRoomSubject(req: Request, res: Response) {
    const { sid , rid} = req.params;

    if ((!sid) || (!rid)) {
      throw new BadRequestError("subject_id or room_id is missing !!!");
    }
    const _room_id    = rid ? Number(rid) : 0;
    const _subject_id = sid ? Number(sid) : 0;

    await RoomService.removeRoomSubject( _room_id , _subject_id );

    return res.status(204).json();
  }


}

// 100% testatdo incluindo banco fora

// ou

// await roomRepository
//   .save(newRoom)
//   .then((savedRoom: Room) => {
//     return res.status(201).json(savedRoom);
//   })
//   .catch((error: Error) => {
//     throw new BadRequestError(error.message)
//   });
