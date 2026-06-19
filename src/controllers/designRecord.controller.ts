import { FastifyRequest, FastifyReply } from "fastify";
import * as service from "../services/designRecord.service";

export const createDesignRecord = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await service.createDesignRecord(req.body);

    return reply.status(201).send({
      success: true,
      message: "Design record created successfully",
      data: result,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getDesignRecords = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await service.getDesignRecords();

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

export const updateDesignRecord = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.updateDesignRecord(
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

export const deleteDesignRecord = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.deleteDesignRecord(id);

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