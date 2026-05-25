import { FastifyInstance } from "fastify";
import * as controller from "../controllers/taskRating.controller";

async function taskRatingRoutes(app: FastifyInstance) {
    app.post("/createTaskRating", controller.createTaskRatingController);
    app.get("/getTaskRatings", controller.getAllTaskRatingsController);
    app.get("/taskRating/:id", controller.getTaskRatingByIdController);
    app.put("/taskRating/:id", controller.updateTaskRatingController);
    app.delete("/taskRating/:id", controller.deleteTaskRatingController);
}

export default taskRatingRoutes;