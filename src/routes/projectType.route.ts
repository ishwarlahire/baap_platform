import { FastifyInstance } from "fastify";
import * as controller from "../controllers/projectType.controller";


async function projectTypeRoutes(app: FastifyInstance) {
  app.post("/projectType", controller.create);
  app.get("/projectTypes", controller.getAll);
  app.get("/projectType/:id", controller.getById);
  app.put("/projectType/:id", controller.update);
  app.delete("/projectType/:id", controller.remove);
}

export default projectTypeRoutes;