// OBSERVANDO O CODIGO ABAIXO ONDE HA UMA controller 
// chamada RoomController que alem de inserir dados da classe Room
// esta inserindo dados da classe Video , analise este codigo e me 
// oriente se este trecho é toleravel ou o melhor seria separar as responsabilidades


/*
import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { Room } from "../entities/Room";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const newRoom = roomRepository.create({ name, description });
      await roomRepository.save(newRoom);

      return res.status(201).json(newRoom);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internet Server Error" });
    }
  }

  
  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) });
      if (!room) {
        return res.status(404).json({ message: "room not found !!!" });
      }

      const newVideo = videoRepository.create({
        title,
        url,
        room,
      });

      await videoRepository.save(newVideo);

      return res.status(201).json(newVideo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internet Server Error" });
    }
  }
}
*/
