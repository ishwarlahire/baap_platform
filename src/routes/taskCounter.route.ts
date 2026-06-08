import { FastifyInstance } from "fastify";
import * as controller from "../controllers/taskCounter.controller";

export default async function (app: FastifyInstance) {
  app.post("/createUserTaskCounter", controller.createUserTaskCounter);

  app.get("/getAllUserTaskCounters", controller.getAllUserTaskCounters);

  app.get(
    "/getUserTaskCounterById/:id",
    controller.getUserTaskCounterById
  );

  app.put(
    "/updateUserTaskCounter/:id",
    controller.updateUserTaskCounter
  );

  app.delete(
    "/deleteUserTaskCounter/:id",
    controller.deleteUserTaskCounter
  );
}