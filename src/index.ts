import Fastify from "fastify";
import Dotenv from "dotenv";
Dotenv.config();
const app = Fastify({ logger: true });

import sequelize from "./config/db";
import "./models/user.model";
import "./models/userProfile.model";
import "./models/project.model";
import "./models/projectstatus.model";
import "./models/task.model";
import "./models/taskstatus.model";
import "./models/taskassignee.model";
import "./models/projectAssignee.model";
import "./models/projectType.model";
import "./models/projectrating.model";
import "./models/taskRating.model";
import "./models/associations";


import userRoutes from "./routes/user.route";
import projectRoutes from "./routes/project.route";
import projectStatus from "./routes/projectstatus.route";
import taskstatusRoute from "./routes/taskstatus.route";
import taskRoutes from "./routes/task.route";
import projectTypeRoutes from "./routes/projectType.route";
import projectRatingRoutes from "./routes/projectRating.routes";
import taskRatingRoutes from "./routes/taskRating.route";



app.register(userRoutes);
app.register(projectRoutes);
app.register(projectStatus);
app.register(taskRoutes);
app.register(taskstatusRoute);
app.register(projectTypeRoutes);
app.register(projectRatingRoutes);
app.register(taskRatingRoutes);

const start = async () => {
    await sequelize.sync();
    // await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true });
    await app.listen({
        port: Number(process.env.PORT),
        host: process.env.HOST
    });

    console.log("Server Started");
};

start();
