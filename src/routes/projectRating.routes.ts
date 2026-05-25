import { FastifyInstance } from "fastify";
import * as controller from "../controllers/projectRating.controller";

async function projectRatingRoutes(app: FastifyInstance) {
    app.post("/createProjectRating", controller.createProjectRatingController);
    app.get("/getProjectRatings", controller.getAllProjectRatingsController);
    app.get("/projectRating/:id", controller.getProjectRatingByIdController);
    app.put("/projectRating/:id", controller.updateProjectRatingController);
    app.delete("/projectRating/:id", controller.deleteProjectRatingController);
};

export default projectRatingRoutes;