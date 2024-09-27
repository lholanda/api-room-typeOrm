import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";
import { VideoController } from "./controllers/VideoController";
import { UserController } from "./controllers/UserController";

const routes = Router();


// Users
routes.post("/login", new UserController().create); 
routes.get("/users", new UserController().list); 
routes.get("/users/:id", new UserController().list); 

//Rooms
routes.get("/rooms", new RoomController().list); // turmas
routes.get("/rooms/:id", new RoomController().list); // turmas
routes.post("/rooms", new RoomController().create); // turmas
routes.delete("/rooms/:id", new RoomController().delete); // turmas

// Subject
routes.get("/subjects", new SubjectController().list); //disciplinas
routes.post("/subjects", new SubjectController().create); //disciplinas

routes.get("/videos",     new VideoController().list); // videos
routes.get("/videos/em-analise",new VideoController().videosEmAnalise); // videos
routes.get("/videos/:id", new VideoController().list); // videos
routes.post("/videos",    new VideoController().create); // videos
routes.delete("/videos/:id", new VideoController().delete); // videos

routes.post("/room/:rid/subject/:sid", new RoomController().createRoomSubject); // room - subject
routes.delete("/room/:rid/subject/:sid", new RoomController().deleteRoomSubject); // room - subject

export default routes;
