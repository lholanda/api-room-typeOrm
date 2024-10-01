import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";
import { VideoController } from "./controllers/VideoController";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { authMiddleware , adminAuthMiddleware} from "./middlewares/middlewareAuth";


const routes = Router();

// Login
routes.post("/users", adminAuthMiddleware, new UserController().create); 
routes.get("/users", adminAuthMiddleware,new UserController().list); 
routes.post("/login", new LoginController().login);



// todas as rotas irao chamar o middlewae primeiro
routes.use(authMiddleware);

routes.get("/profile", new LoginController().rotaQualquer);
// Users
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
