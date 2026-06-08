import { FastifyReply, FastifyRequest } from "fastify";
import * as service from "../services/taskCounter.service";

export const createUserTaskCounter = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await service.createUserTaskCounter(req.body);

    return reply.status(201).send({
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

export const getAllUserTaskCounters = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const result = await service.getAllUserTaskCounters();

  return reply.send({
    success: true,
    data: result,
  });
};

export const getUserTaskCounterById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.getUserTaskCounterById(id);

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

export const updateUserTaskCounter = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.updateUserTaskCounter(
      id,
      req.body
    );

    return reply.send({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserTaskCounter = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.deleteUserTaskCounter(id);

    return reply.send({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};