import TaskStatus from "../models/taskstatus.model";

import { Op } from "sequelize";

export const createTaskStatus = async (data: any) => {
    if (!data.name) {
        throw new Error("Status name is required");
    }
    if (!data.task_id) {
        data.level = 1;
        data.is_default = true;

        const exists = await TaskStatus.findOne({
            where: {
                name: data.name,
                task_id: {
                    [Op.is]: null
                }
            }
        });

        if (exists) {
            throw new Error("Default status already exists");
        }
    }
    if (data.task_id) {
        data.level = data.level || 2;
        data.is_default = false;

        const exists = await TaskStatus.findOne({
            where: {
                name: data.name,
                task_id: data.task_id
            }
        });

        if (exists) {
            throw new Error("Status already exists for this task");
        }
    }

    return await TaskStatus.create(data);
};

export const getAllTaskStatus = async () => {
    return await TaskStatus.findAll();
};

export const getTaskStatusById = async (id: string) => {
    const status = await TaskStatus.findOne({ where: { id } });
    if (!status) {
        throw new Error("Task status not found");
    }

    return status;
};

export const updateTaskStatus = async (id: string, data: any) => {
    await TaskStatus.update(data, { where: { id } });

    return { message: "Task status updated successfully" };
};

export const deleteTaskStatus = async (id: string) => {
    await TaskStatus.destroy({ where: { id } });

    return { message: "Task status deleted successfully" };
};