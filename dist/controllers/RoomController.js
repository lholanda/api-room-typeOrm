"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const Api_errors_1 = require("../helpers/Api-errors");
const RoomService_1 = require("../services/RoomService");
const VideoService_1 = require("../services/VideoService");
class RoomController {
    // inserir Rooms
    async create(req, res) {
        const { name, description, code } = req.body;
        if (!name) {
            throw new Api_errors_1.BadRequestError("name is required !!!");
        }
        const newRoom = await RoomService_1.RoomService.create(name, description, code);
        return res.status(201).json(newRoom);
    }
    //--------------------------------------------------------------------
    // Exclui Room, verifica se pode apagar pois 
    // rooms.id é usado como chave estrangeira na tabela de videos
    // -------------------------------------------------------------------
    async delete(req, res) {
        const { id } = req.params;
        //const room = await RoomService.find( Number(id) );
        const room = await RoomService_1.RoomService.findById(Number(id));
        if (!room) {
            throw new Api_errors_1.NotFoundError(`Room not found ( id = ${id} )`);
        }
        const video = await VideoService_1.VideoService.findByRoom(room.id);
        if (video) {
            throw new Api_errors_1.FkFoundError(`Foreign key violation found in the videos table (id = ${video.id}). This deletion is not possible !!!`);
        }
        const msgResult = await RoomService_1.RoomService.delete(Number(id));
        return res.status(204).json();
    }
    // Listagem de Room
    async list(req, res) {
        const { id } = req.params;
        const iid = id ? Number(id) : 0;
        const rooms = await RoomService_1.RoomService.list(iid);
        return res.status(200).json(rooms);
    }
}
exports.RoomController = RoomController;
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
