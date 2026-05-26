import { Op } from "sequelize";
import ProjectRating from "../models/projectRating.model";

interface CreateProjectRatingDTO {
    project_id: string;
    client_id: string;
    user_id?: string;
    rating: number;
    comment?: string;
    created_by?: string;
    updated_by?: string;
}

interface UpdateProjectRatingDTO {
    project_id?: string;
    client_id?: string;
    user_id?: string;
    rating?: number;
    comment?: string;
    updated_by?: string;
    is_deleted?: boolean;
}

export const createProjectRatingService = async (
    data: CreateProjectRatingDTO
) => {

    const rating = await ProjectRating.create({
        project_id: data.project_id,
        client_id: data.client_id,
        user_id: data.user_id ?? undefined,
        rating: data.rating,
        comment: data.comment ?? undefined,
        created_by: data.created_by ?? undefined,
        updated_by: data.updated_by ?? undefined,
    });

    return rating;
};

export const getAllProjectRatingsService = async () => {
    const ratings = await ProjectRating.findAll({
        where: {
            is_deleted: false,
        },
        order: [["created_at", "DESC"]],
    });

    return ratings;
};

export const getProjectRatingByIdService = async (id: string) => {
    const rating = await ProjectRating.findOne({
        where: {
            id,
            is_deleted: false,
        },
    });

    return rating;
};

export const updateProjectRatingService = async (
    id: string,
    data: UpdateProjectRatingDTO
) => {
    const rating = await ProjectRating.findOne({
        where: {
            id,
            is_deleted: false,
        },
    });

    if (!rating) {
        return null;
    }

    await rating.update({
        project_id: data.project_id ?? rating.project_id,
        client_id: data.client_id ?? rating.client_id,
        user_id: data.user_id ?? rating.user_id,
        rating: data.rating ?? rating.rating,
        comment: data.comment ?? rating.comment,
        updated_by: data.updated_by ?? rating.updated_by,
        is_deleted: data.is_deleted ?? rating.is_deleted,
        updated_at: new Date(),
    });

    return rating;
};

export const deleteProjectRatingService = async (id: string) => {
    const rating = await ProjectRating.findOne({
        where: {
            id,
            is_deleted: false,
        },
    });

    if (!rating) {
        return null;
    }

    await rating.update({
        is_deleted: true,
        updated_at: new Date(),
    });

    return rating;
};