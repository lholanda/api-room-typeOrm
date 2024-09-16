import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";
import { VideoController } from "./controllers/VideoController";

const routes = Router();

//routes.get("/rooms",    new RoomController().list);     // turmas
routes.get("/rooms", new RoomController().list); // turmas
routes.get("/rooms/:id", new RoomController().list); // turmas
routes.post("/rooms", new RoomController().create); // turmas
routes.delete("/rooms/:id", new RoomController().delete); // turmas

routes.get("/subjects", new SubjectController().list); //disciplinas
routes.post("/subjects", new SubjectController().create); //disciplinas

routes.get("/videos", new VideoController().list); // videos
routes.post("/videos", new VideoController().create); // videos

export default routes;
