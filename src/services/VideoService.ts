// videoService.ts
import { videoRepository } from "../repositories/videoRepository";
import { roomRepository } from "../repositories/roomRepository";
import { NotFoundError } from "../helpers/Api-errors";

export class VideoService {
  static async create(title: string, url: string, room_id: number) {
    const room = await roomRepository.findOneBy({ id: room_id });

    if (!room) {
      throw new NotFoundError('Room not found '+ '(room_id = '+ room_id+')');
    }

    const newVideo = videoRepository.create({ title, url, room });
    return await videoRepository.save(newVideo);
    
  }
}

