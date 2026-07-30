import { FastifyInstance } from "fastify";
import * as controller from "../controllers/student.controller";

export default async function (app: FastifyInstance) {

  app.post("/createStudent", controller.createStudent);

  app.get("/getAllStudents", controller.getAllStudents);

  app.get("/getStudentById/:id", controller.getStudentById);

  app.post("/addStudentMarks/:id", controller.addStudentMarks);

  app.get("/getStudentResult/:id", controller.getStudentResult);

  app.get("/getTopperStudents", controller.getTopperStudents);

  app.get("/getFailedStudents", controller.getFailedStudents);

  app.get("/getStudentRank/:id", controller.getStudentRank);

  app.get("/getClassStatistics", controller.getClassStatistics);

  app.put("/updateStudent/:id", controller.updateStudent);

  app.get("/searchStudents", controller.searchStudents);

  

}