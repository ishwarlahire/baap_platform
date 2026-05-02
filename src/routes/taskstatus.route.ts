import { FastifyInstance } from "fastify";
import * as controller from "../controllers/taskstatus.controller";

export default async function (app: FastifyInstance) {
  app.post("/createTaskStatus", controller.createTaskStatus);
  app.get("/getAllTaskStatus", controller.getAllTaskStatus);
  app.get("/getTaskStatusById/:id", controller.getTaskStatusById);
  app.put("/updateTaskStatus/:id", controller.updateTaskStatus);
  app.delete("/deleteTaskStatus/:id", controller.deleteTaskStatus);
}