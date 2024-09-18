"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const Api_errors_1 = require("../helpers/Api-errors");
const VideoService_1 = require("../services/VideoService");
class VideoController {
    async create(req, res) {
        const { title, url, room_id } = req.body;
        if (!title) {
            throw new Api_errors_1.BadRequestError("title is required !!!");
        }
        const newVideo = await VideoService_1.VideoService.create(title, url, room_id);
        return res.status(201).json(newVideo);
    }
    async delete(req, res) {
        const { id } = req.params;
        //const room = await RoomService.find( Number(id) );
        const video = await VideoService_1.VideoService.findById(Number(id));
        if (!video) {
            throw new Api_errors_1.NotFoundError(`Video not found ( id = ${id} )`);
        }
        const msgResult = await VideoService_1.VideoService.delete(Number(id));
        return res.status(204).json();
    }
    async list(req, res) {
        const { id } = req.params;
        const iid = id ? Number(id) : 0;
        const videos = await VideoService_1.VideoService.list(iid);
        return res.status(200).json(videos);
    }
}
exports.VideoController = VideoController;
/*
// biblioteca para validacao
*/ 
