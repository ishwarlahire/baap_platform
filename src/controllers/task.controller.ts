import { FastifyRequest, FastifyReply } from "fastify";
import * as service from "../services/task.service";

export const createTask = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await service.createTask(req.body);

    return reply.status(201).send({
      success: true,
      message: "Task created successfully",
      data: result
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message
    });
  }
};

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const result = await service.getTasks();

  return reply.send({
    success: true,
    data: result
  });
};

export const getTaskById = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.getTaskById(id);

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

export const updateTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  const result = await service.updateTask(id, req.body);

  return reply.send({
    success: true,
    message: result.message
  });
};

export const deleteTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  const result = await service.deleteTask(id);

  return reply.send({
    success: true,
    message: result.message
  });
};