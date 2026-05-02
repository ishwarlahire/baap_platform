import { FastifyInstance } from "fastify";
import * as controller from "../controllers/projectstatus.controller";

export default async function projectStatus(app: FastifyInstance) {
    app.post("/createProjectStatus", controller.createStatus);
    app.get("/getAllStatus", controller.getAllStatus);
    app.get("/:id", controller.getStatusById);
    app.put("/:id", controller.updateStatus);
    app.delete("/:id", controller.deleteStatus);
}


