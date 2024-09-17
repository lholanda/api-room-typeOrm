import { Request, Response } from "express";
import { BadRequestError } from "../helpers/Api-errors";
import { VideoService } from "../services/VideoService";
import { AppDataSource } from "../data-source";
import { Video } from "../entities/Video";

export class VideoController {
  
  async create(req: Request, res: Response) {
    const { title, url , room_id} = req.body;

    if (!title) {
      throw new BadRequestError("title is required !!!");
    }

    const newVideo = await VideoService.create( title, url , room_id );
    return res.status(201).json(newVideo);
  }

  async list(req: Request, res: Response) {
    const { id } = req.params;

    const iid = id ? Number(id) : 0;

    const videos =  await VideoService.list( iid );
    
    return res.status(200).json(videos);


  }


}

/*
// biblioteca para validacao
*/