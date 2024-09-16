import { Request, Response } from "express";
import { BadRequestError, NotFoundError , FkFoundError } from "../helpers/Api-errors";
import { RoomService } from "../services/RoomService";
import { VideoService } from "../services/VideoService";
import { Room } from "../entities/Room";

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

  // Exclui Room
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const room = await RoomService.find( Number(id) );
    if (!room) {
      throw new NotFoundError("Room not found " + "(room_id = " + id + ")");
    }

   const room_id = room[0].id;
   const video = ' '; //await VideoService.findByRoom( Number(room_id) );
   if (video) {
     throw new FkFoundError('Foreign Key found. This deletion is not possible !!!');
   }


    
    //const {name} = room
    
    //onsole.log(name)

    // const video = VideoService.findByRoom( room );



    const msgResult = await RoomService.delete( Number(id) );
    return res.status(204).json();
  }

  // Listagem de Room
  async list(req: Request, res: Response) {
    const { id } = req.params;

    const iid = id ? Number(id) : 0;

    //const { take, perpage } = req.query;

    //console.log(take, perpage, Number(id) );

    const rooms = await RoomService.list( iid );
    return res.status(200).json(rooms);
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
