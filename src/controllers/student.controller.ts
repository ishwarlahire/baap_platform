import { FastifyRequest, FastifyReply } from "fastify";
import * as service from "../services/student.service";

// Create Student
export const createStudent = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await service.createStudent(req.body);

    return reply.status(201).send({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get All Students
export const getAllStudents = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await service.getAllStudents();

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get Student By Id
export const getStudentById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.getStudentById(id);

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return reply.status(404).send({
      success: false,
      message: error.message,
    });
  }
};

// Add Student Marks
export const addStudentMarks = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.addStudentMarks(id, req.body);

    return reply.status(201).send({
      success: true,
      message: "Marks added successfully",
      data: result,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get Student Result
export const getStudentResult = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.getStudentResult(id);

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return reply.status(404).send({
      success: false,
      message: error.message,
    });
  }
};

// Get Topper Students
export const getTopperStudents = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await service.getTopperStudents();

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get Failed Students
export const getFailedStudents = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await service.getFailedStudents();

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get Student Rank
export const getStudentRank = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.getStudentRank(id);

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return reply.status(404).send({
      success: false,
      message: error.message,
    });
  }
};

// Get Class Statistics
export const getClassStatistics = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await service.getClassStatistics();

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};