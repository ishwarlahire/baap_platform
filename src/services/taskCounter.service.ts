import UserTaskCounter from "../models/taskCounter.model";
import User from "../models/user.model";
import Task from "../models/task.model";

export const createUserTaskCounter = async (data: any) => {
  const { user_id, task_id } = data;

  
  if (!user_id) {
    throw new Error("user_id is required");
  }

  if (!task_id) {
    throw new Error("task_id is required");
  }


  const user = await User.findByPk(user_id);

  if (!user) {
    throw new Error("User not found");
  }

  
  const task = await Task.findByPk(task_id);

  if (!task) {
    throw new Error("Task not found");
  }

  const existingRecord = await UserTaskCounter.findOne({
    where: {
      user_id,
      task_id,
    },
  });

  if (existingRecord) {
    throw new Error(
      "Task counter already exists for this user"
    );
  }

  return await UserTaskCounter.create(data);
};

export const getAllUserTaskCounters = async () => {
  return await UserTaskCounter.findAll();
};

export const getUserTaskCounterById = async (id: string) => {
  if (!id) {
    throw new Error("id is required");
  }

  const record = await UserTaskCounter.findByPk(id);

  if (!record) {
    throw new Error("Record not found");
  }

  return record;
};

export const updateUserTaskCounter = async (
  id: string,
  data: any
) => {
  if (!id) {
    throw new Error("id is required");
  }

  const record = await UserTaskCounter.findByPk(id);

  if (!record) {
    throw new Error("Record not found");
  }

 
  if (
    data.is_viewed !== undefined &&
    typeof data.is_viewed !== "boolean"
  ) {
    throw new Error(
      "is_viewed must be true or false"
    );
  }

  await record.update(data);

  return {
    message: "Record updated successfully",
  };
};

export const deleteUserTaskCounter = async (id: string) => {
  if (!id) {
    throw new Error("id is required");
  }

  const record = await UserTaskCounter.findByPk(id);

  if (!record) {
    throw new Error("Record not found");
  }

  await record.destroy();

  return {
    message: "Record deleted successfully",
  };
};