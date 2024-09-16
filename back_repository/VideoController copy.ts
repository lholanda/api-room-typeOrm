/*
import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { Video } from "../entities/Video";

export class VideoController {
  async create(req: Request, res: Response) {
    const { title, url, room_id } = req.body;

    const room = await roomRepository.findOneBy({ id: Number(room_id) });
    if (!room) {
      return res.status(404).json({ message: "room not found !!!" });
    }

    const newVideo = videoRepository.create({ title, url, room });
    await roomRepository
      .save(newVideo)
      .then((savedVideo: Video) => {
        return res.status(201).json(savedVideo);
      })
      .catch((error: Error) => {
        return res.status(500).json({ message: error.message });
      });
  }
}
*/