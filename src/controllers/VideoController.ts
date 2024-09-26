import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/Api-errors";
import { VideoService } from "../services/VideoService";
import { AppDataSource } from "../data-source";
import { Video } from "../entities/Video";

export class VideoController {
  
  // cadastra um video vinculando-o a uma Room
  async create(req: Request, res: Response) {
    const { title, url , room_id} = req.body;

    if (!title) {
      throw new BadRequestError("title is required !!!");
    }
    const _id = room_id ? room_id : 0;
    
    const newVideo = await VideoService.create( title, url , _id );

    return res.status(201).json(newVideo);
  }


  async delete(req: Request, res: Response) {
    const { id } = req.params;
    //const room = await RoomService.find( Number(id) );
    const video = await VideoService.findById(Number(id));
    if (!video) {
      throw new NotFoundError(`Video not found ( id = ${id} )`);
    }


    const msgResult = await VideoService.delete(Number(id));

    return res.status(204).json();
  }

  async videosEmAnalise(req: Request, res: Response) {
    
    console.log( 'beta' )
    //const videos = {}
    const videos =  await VideoService.findByRoom2( 1000 );
    
    return res.status(200).json(videos);


  }







  async list(req: Request, res: Response) {
    const { id } = req.params;

    const _id = id ? Number(id) : 0;

    const videos =  await VideoService.list( _id );
    
    return res.status(200).json(videos);
  }


}

/*
// biblioteca para validacao
*/