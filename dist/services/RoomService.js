"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const roomRepository_1 = require("../repositories/roomRepository");
class RoomService {
    // service create
    static async create(name, description, code) {
        const newRoom = roomRepository_1.roomRepository.create({ name, description, code });
        return await roomRepository_1.roomRepository.save(newRoom);
    }
    // service find
    static async delete(id) {
        return await roomRepository_1.roomRepository.delete(id);
    }
    // service find
    static async list(id) {
        let filtro = {};
        if (id != 0) {
            filtro = ` id = ${id} `;
        }
        return await roomRepository_1.roomRepository
            .createQueryBuilder("room")
            .where(filtro)
            .orderBy("room.id")
            .getMany();
    }
    // service find
    static async findById(id) {
        return await roomRepository_1.roomRepository.findOneBy({ id });
    }
    // service find
    static async find(id) {
        return await roomRepository_1.roomRepository.find({ where: { id } });
    }
}
exports.RoomService = RoomService;
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
