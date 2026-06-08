import Fastify from "fastify";
import Dotenv from "dotenv";
import path from "path";

import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";

Dotenv.config();

const app = Fastify({ logger: true });

app.register(multipart);

app.register(fastifyStatic, {
  root: path.join(process.cwd(), "uploads"),
  prefix: "/uploads/",
});

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
import "./models/projectRating.model";
import "./models/taskWatcher.model";
import "./models/taskRating.model";
import "./models/taskmedia.model";
import "./models/taskCounter.model"
import "./models/associations";

import userRoutes from "./routes/user.route";
import projectRoutes from "./routes/project.route";
import projectStatus from "./routes/projectstatus.route";
import taskstatusRoute from "./routes/taskstatus.route";
import taskRoutes from "./routes/task.route";
import projectTypeRoutes from "./routes/projectType.route";
import projectRatingRoutes from "./routes/projectRating.routes";
import taskRatingRoutes from "./routes/taskRating.route";
import taskCounterRoute from "./routes/taskCounter.route";

app.register(userRoutes);
app.register(projectRoutes);
app.register(projectStatus);
app.register(taskRoutes);
app.register(taskstatusRoute);
app.register(projectTypeRoutes);
app.register(projectRatingRoutes);
app.register(taskRatingRoutes);
app.register(taskCounterRoute);

const start = async () => {
  try {
    await sequelize.sync();

    await app.listen({
      port: Number(process.env.PORT),
      host: process.env.HOST,
    });

    console.log("Server Started");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();