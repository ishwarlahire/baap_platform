import Task from "../models/task.model";
import TaskStatus from "../models/taskstatus.model";
import Project from "../models/project.model";

export const createTask = async (data: any) => {
  return await Task.create(data);
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