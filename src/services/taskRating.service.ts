import TaskRating from "../models/taskRating.model";

interface CreateTaskRatingDTO {
    task_id: string;
    rating: number;
    comment?: string;
    created_by?: string;
    updated_by?: string;
}

interface UpdateTaskRatingDTO {
    task_id?: string;
    rating?: number;
    comment?: string;
    updated_by?: string;
    is_deleted?: boolean;
}

export const createTaskRatingService = async (data: CreateTaskRatingDTO) => {
    const taskRating = await TaskRating.create({
        task_id: data.task_id,
        rating: data.rating,
        comment: data.comment ?? undefined,
        created_by: data.created_by ?? undefined,
        updated_by: data.updated_by ?? undefined,
    });

    return taskRating;
};

export const getAllTaskRatingsService = async () => {
    const taskRatings = await TaskRating.findAll({
        where: { is_deleted: false },
        order: [["created_at", "DESC"]],
    });

    return taskRatings;
};

export const getTaskRatingByIdService = async (id: string) => {
    const taskRating = await TaskRating.findOne({
        where: {
            id,
            is_deleted: false,
        },
    });

    return taskRating;
};

export const updateTaskRatingService = async (
    id: string,
    data: UpdateTaskRatingDTO
) => {
    const taskRating = await TaskRating.findOne({
        where: {
            id,
            is_deleted: false,
        },
    });

    if (!taskRating) return null;

    await taskRating.update({
        task_id: data.task_id ?? taskRating.task_id,
        rating: data.rating ?? taskRating.rating,
        comment: data.comment ?? taskRating.comment,
        updated_by: data.updated_by ?? taskRating.updated_by,
        is_deleted: data.is_deleted ?? taskRating.is_deleted,
        updated_at: new Date(),
    });

    return taskRating;
};

export const deleteTaskRatingService = async (id: string) => {
    const taskRating = await TaskRating.findOne({
        where: {
            id,
            is_deleted: false,
        },
    });

    if (!taskRating) return null;

    await taskRating.update({
        is_deleted: true,
        updated_at: new Date(),
    });

    return taskRating;
};