import { FastifyRequest, FastifyReply } from "fastify";
import * as service from "../services/taskstatus.service";

export const createTaskStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await service.createTaskStatus(req.body);

    return reply.status(201).send({
      success: true,
      message: "Task status created successfully",
      data: result
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message
    });
  }
};

export const getAllTaskStatus = async (_: FastifyRequest, reply: FastifyReply) => {
  const result = await service.getAllTaskStatus();

  return reply.send({
    success: true,
    data: result
  });
};

export const getTaskStatusById = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.getTaskStatusById(id);

    return reply.send({
      success: true,
      data: result
    });
  } catch (error: any) {
    return reply.status(404).send({
      success: false,
      message: error.message
    });
  }
};

export const updateTaskStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  const result = await service.updateTaskStatus(id, req.body);

  return reply.send({
    success: true,
    message: result.message
  });
};

export const deleteTaskStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  const result = await service.deleteTaskStatus(id);

  return reply.send({
    success: true,
    message: result.message
  });
};