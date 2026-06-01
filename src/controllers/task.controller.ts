import { FastifyRequest, FastifyReply } from "fastify";
import * as service from "../services/task.service";

export const createTask = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await service.createTask(req.body);

    return reply.status(201).send({
      success: true,
      message: "Task created successfully",
      data: result,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// import { FastifyRequest, FastifyReply } from "fastify";
// import * as service from "../services/task.service";

export const uploadTaskMedia = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    const parts = (req as any).parts();
    const files: any[] = [];
    const body: any = {};

    for await (const part of parts) {
      if (part.type === "file") {
        console.log("FILE:", part.filename, part.mimetype);

        const buffer = await part.toBuffer();

        files.push({
          filename: part.filename,
          mimetype: part.mimetype,
          buffer,
        });
      } else {
        console.log("FIELD:", part.fieldname, part.value);
        body[part.fieldname] = part.value;
      }
    }

    console.log("BODY:", body);
    console.log("FILES COUNT:", files.length);

    const result = await service.uploadTaskMedia(id, files, body.created_by);

    return reply.status(201).send({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);
    return reply.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { filter = "all-task", userId } = req.query as {
      filter?: string;
      userId?: string;
    };

    const result = await service.getTasks(filter, userId);

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


export const getTaskById = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.getTaskById(id);

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

export const updateTask = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.updateTask(id, req.body);

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

export const deleteTask = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    const result = await service.deleteTask(id);

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