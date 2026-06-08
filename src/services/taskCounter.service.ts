import UserTaskCounter from "../models/taskCounter.model";

export const createUserTaskCounter = async (data: any) => {
  return await UserTaskCounter.create(data);
};

export const getAllUserTaskCounters = async () => {
  return await UserTaskCounter.findAll();
};

export const getUserTaskCounterById = async (id: string) => {
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
  const record = await UserTaskCounter.findByPk(id);

  if (!record) {
    throw new Error("Record not found");
  }

  await record.update(data);

  return {
    message: "Record updated successfully",
  };
};

export const deleteUserTaskCounter = async (id: string) => {
  const record = await UserTaskCounter.findByPk(id);

  if (!record) {
    throw new Error("Record not found");
  }

  await record.destroy();

  return {
    message: "Record deleted successfully",
  };
};