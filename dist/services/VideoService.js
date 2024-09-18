"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
// videoService.ts
const videoRepository_1 = require("../repositories/videoRepository");
const roomRepository_1 = require("../repositories/roomRepository");
const Api_errors_1 = require("../helpers/Api-errors");
class VideoService {
    static async create(title, url, room_id) {
        const room = await roomRepository_1.roomRepository.findOneBy({ id: room_id });
        if (!room) {
            throw new Api_errors_1.NotFoundError(`Room not found (room_id = ${room_id} )`);
        }
        const newVideo = videoRepository_1.videoRepository.create({ title, url, room });
        return await videoRepository_1.videoRepository.save(newVideo);
    }
    // service find
    static async delete(id) {
        return await videoRepository_1.videoRepository.delete(id);
    }
    // service find
    static async list(id) {
        let filtro = {};
        if (id != 0) {
            filtro = ` video.id = ${id} `;
        }
        return await videoRepository_1.videoRepository
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
    static async findById(id) {
        return await videoRepository_1.videoRepository.findOneBy({ id });
    }
    // utilizado em RoomService para verificar se existe a room usada em video cadastrada em room- para evitar apagar
    static async findByRoom(room_fk) {
        console.log("aqui");
        return await videoRepository_1.videoRepository
            .createQueryBuilder("video")
            .where("video.room_fk = :room_fk", { room_fk: room_fk })
            .getOne();
    }
}
exports.VideoService = VideoService;
