import { FastifyInstance } from "fastify";
import * as controller from "../controllers/project.controller";

async function projectRoutes(app: FastifyInstance) {
    app.post("/createProject", controller.createProject),
    app.get("/getProjects", controller.getProjects)
    app.get("/project/:id", controller.getProjectById);
    app.put("/project/:id", controller.updateProject);
    app.delete("/project/:id", controller.deleteProject);
};

export default projectRoutes;