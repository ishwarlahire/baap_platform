import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProjectRatingService,
  deleteProjectRatingService,
  getAllProjectRatingsService,
  getProjectRatingByIdService,
  updateProjectRatingService,
} from "../services/projectRating.service";

export const createProjectRatingController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const body = request.body as {
      project_id: string;
      client_id: string;
      user_id?: string;
      rating: number;
      comment?: string;
      created_by?: string;
      updated_by?: string;
    };

    if (!body.project_id || !body.client_id || body.rating === undefined) {
      return reply.code(400).send({
        success: false,
        message: "project_id, client_id and rating are required",
      });
    }

    const result = await createProjectRatingService(body);

    return reply.code(201).send({
      success: true,
      message: "Project rating created successfully",
      data: result,
    });
  } catch (error: any) {
    return reply.code(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getAllProjectRatingsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await getAllProjectRatingsService();

    return reply.code(200).send({
      success: true,
      message: "Project ratings fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return reply.code(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getProjectRatingByIdController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const result = await getProjectRatingByIdService(id);

    if (!result) {
      return reply.code(404).send({
        success: false,
        message: "Project rating not found",
      });
    }

    return reply.code(200).send({
      success: true,
      message: "Project rating fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return reply.code(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateProjectRatingController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const body = request.body as {
      project_id?: string;
      client_id?: string;
      user_id?: string;
      rating?: number;
      comment?: string;
      updated_by?: string;
      is_deleted?: boolean;
    };

    const result = await updateProjectRatingService(id, body);

    if (!result) {
      return reply.code(404).send({
        success: false,
        message: "Project rating not found",
      });
    }

    return reply.code(200).send({
      success: true,
      message: "Project rating updated successfully",
      data: result,
    });
  } catch (error: any) {
    return reply.code(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const deleteProjectRatingController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const result = await deleteProjectRatingService(id);

    if (!result) {
      return reply.code(404).send({
        success: false,
        message: "Project rating not found",
      });
    }

    return reply.code(200).send({
      success: true,
      message: "Project rating deleted successfully",
    });
  } catch (error: any) {
    return reply.code(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};