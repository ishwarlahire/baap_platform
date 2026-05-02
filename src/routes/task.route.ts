import { FastifyInstance } from "fastify";
import * as controller from "../controllers/task.controller";

export default async function (app: FastifyInstance) {
  app.post("/createTask", controller.createTask);
  app.get("/getAllTask", controller.getTasks);
  app.get("/getTaskById/:id", controller.getTaskById);
  app.put("/updateTask/:id", controller.updateTask);
  app.delete("/deleteTask/:id", controller.deleteTask);
}