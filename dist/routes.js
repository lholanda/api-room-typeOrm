"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubjectController_1 = require("./controllers/SubjectController");
const RoomController_1 = require("./controllers/RoomController");
const VideoController_1 = require("./controllers/VideoController");
const routes = (0, express_1.Router)();
//routes.get("/rooms",    new RoomController().list);     // turmas
routes.get("/rooms", new RoomController_1.RoomController().list); // turmas
routes.get("/rooms/:id", new RoomController_1.RoomController().list); // turmas
routes.post("/rooms", new RoomController_1.RoomController().create); // turmas
routes.delete("/rooms/:id", new RoomController_1.RoomController().delete); // turmas
routes.get("/subjects", new SubjectController_1.SubjectController().list); //disciplinas
routes.post("/subjects", new SubjectController_1.SubjectController().create); //disciplinas
routes.get("/videos", new VideoController_1.VideoController().list); // videos
routes.get("/videos/:id", new VideoController_1.VideoController().list); // videos
routes.post("/videos", new VideoController_1.VideoController().create); // videos
routes.delete("/videos/:id", new VideoController_1.VideoController().delete); // videos
exports.default = routes;
