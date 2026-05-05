import Task from "../models/task.model";
import TaskStatus from "../models/taskstatus.model";
import Project from "../models/project.model";
import TaskAssignee from "../models/taskassignee.model";
import sequelize from "../config/db";

export const createTask = async (data: any) => {
    const t = await sequelize.transaction();

    try {
        const task = await Task.create(data, { transaction: t });
        if (data.assigned_to) {
            await TaskAssignee.create(
                {
                    task_id: task.getDataValue("id"),
                    assigned_to: data.assigned_to,
                    assigned_by: data.created_by,
                    created_by: data.created_by,
                    updated_by: data.created_by
                },
                { transaction: t }
            );
        }

        await t.commit();
        return task;

    } catch (error) {
        await t.rollback();
        throw error;
    }
};


export const getTasks = async () => {
    return await Task.findAll({
        include: [
            { model: TaskStatus, as: "status" },
            { model: Project, as: "project" }
        ]
    });
};

export const getTaskById = async (id: string) => {
    const task = await Task.findOne({
        where: { id },
        include: [
            { model: TaskStatus, as: "status" },
            { model: Project, as: "project" }
        ]
    });

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
};

export const updateTask = async (id: string, data: any) => {
    await Task.update(data, { where: { id } });

    return { message: "Task updated successfully" };
};

export const deleteTask = async (id: string) => {
    await Task.destroy({ where: { id } });

    return { message: "Task deleted successfully" };
};