import { FastifyReply, FastifyRequest } from "fastify";
import {
    createTaskRatingService,
    deleteTaskRatingService,
    getAllTaskRatingsService,
    getTaskRatingByIdService,
    updateTaskRatingService,
} from "../services/taskRating.service";

export const createTaskRatingController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const taskRating = await createTaskRatingService(req.body as any);

        return reply.status(201).send({
            success: true,
            message: "Task rating created successfully",
            data: taskRating,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({
            success: false,
            message: "Failed to create task rating",
            error,
        });
    }
};

export const getAllTaskRatingsController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const taskRatings = await getAllTaskRatingsService();

        return reply.send({
            success: true,
            message: "Task ratings fetched successfully",
            data: taskRatings,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({
            success: false,
            message: "Failed to fetch task ratings",
            error,
        });
    }
};

export const getTaskRatingByIdController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { id } = req.params as { id: string };
        const taskRating = await getTaskRatingByIdService(id);

        if (!taskRating) {
            return reply.status(404).send({
                success: false,
                message: "Task rating not found",
            });
        }

        return reply.send({
            success: true,
            message: "Task rating fetched successfully",
            data: taskRating,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({
            success: false,
            message: "Failed to fetch task rating",
            error,
        });
    }
};

export const updateTaskRatingController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { id } = req.params as { id: string };
        const taskRating = await updateTaskRatingService(id, req.body as any);

        if (!taskRating) {
            return reply.status(404).send({
                success: false,
                message: "Task rating not found",
            });
        }

        return reply.send({
            success: true,
            message: "Task rating updated successfully",
            data: taskRating,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({
            success: false,
            message: "Failed to update task rating",
            error,
        });
    }
};

export const deleteTaskRatingController = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const { id } = req.params as { id: string };
        const taskRating = await deleteTaskRatingService(id);

        if (!taskRating) {
            return reply.status(404).send({
                success: false,
                message: "Task rating not found",
            });
        }

        return reply.send({
            success: true,
            message: "Task rating deleted successfully",
            data: taskRating,
        });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({
            success: false,
            message: "Failed to delete task rating",
            error,
        });
    }
};