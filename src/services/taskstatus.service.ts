import TaskStatus from "../models/taskstatus.model";
import sequelize from "../config/db";
import { Op } from "sequelize";

export const createTaskStatus = async (data: any) => {
  const t = await sequelize.transaction();

  try {
    if (!data.name) {
      throw new Error("Status name is required");
    }
    const nameExists = await TaskStatus.findOne({
      where: {
        name: data.name
      },
      transaction: t
    });
    if (nameExists) {
      throw new Error("Status name already exists");
    }
    const maxSequence = await TaskStatus.max("sequence", { transaction: t });
    const nextSequence = maxSequence ? Number(maxSequence) + 1 : 1;
    const sequenceExists = await TaskStatus.findOne({
      where: {
        sequence: nextSequence
      },
      transaction: t
    });

    if (sequenceExists) {
      throw new Error("Sequence conflict, try again");
    }
    data.sequence = nextSequence;
    const result = await TaskStatus.create(data, { transaction: t });

    await t.commit();
    return result;

  } catch (error) {
    await t.rollback();
    throw error;
  }
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