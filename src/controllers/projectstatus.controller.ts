import { FastifyRequest, FastifyReply } from "fastify";
import * as service from "../services/projectstatus.service";

export const createStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const result = await service.createStatus(req.body);

  return reply.status(201).send({
    success: true,
    message: "Status created successfully",
    data: result
  });
};

export const getAllStatus = async (_: FastifyRequest, reply: FastifyReply) => {
  const result = await service.getAllStatus();

  return reply.send({
    success: true,
    data: result
  });
};

export const getStatusById = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  const result = await service.getStatusById(id);

  return reply.send({
    success: true,
    data: result
  });
};

export const updateStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  const result = await service.updateStatus(id, req.body);

  return reply.send({
    success: true,
    message: result.message
  });
};

export const deleteStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  const result = await service.deleteStatus(id);

  return reply.send({
    success: true,
    message: result.message
  });
};