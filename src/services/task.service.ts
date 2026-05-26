import Task from "../models/task.model";
import TaskStatus from "../models/taskstatus.model";
import Project from "../models/project.model";
import TaskAssignee from "../models/taskassignee.model";
import TaskWatcher from "../models/taskWatcher.model";
import User from "../models/user.model";
import sequelize from "../config/db";


export const createTask = async (data: any) => {
  const t = await sequelize.transaction();

  try {
    let statusId = data.status_id;

    if (!statusId) {
      const defaultStatus = await TaskStatus.findOne({
        where: { sequence: 1 },
        transaction: t,
      });

      if (!defaultStatus) {
        throw new Error("Default status (sequence = 1) not found");
      }

      statusId = defaultStatus.id;
    }

    const { watcher_ids, task_watchers, client_id, ...taskData } = data;

    const task = await Task.create(
      {
        ...taskData,
        assigned_to: null,
        status_id: statusId,
      },
      { transaction: t }
    );

    let assignees: string[] = [];

    if (Array.isArray(data.assigned_to)) {
      assignees = data.assigned_to;
    } else if (data.assigned_to) {
      assignees = [data.assigned_to];
    } else {
      assignees = [data.created_by];
    }

    for (const userId of assignees) {
      await TaskAssignee.create(
        {
          task_id: task.id,
          assigned_to: userId,
          assigned_by: data.created_by,
          created_by: data.created_by,
          updated_by: data.created_by,
        },
        { transaction: t }
      );
    }

    const watchers: string[] = [];

    if (Array.isArray(watcher_ids)) {
      watchers.push(...watcher_ids);
    } else if (Array.isArray(task_watchers)) {
      for (const item of task_watchers) {
        if (typeof item === "string") {
          watchers.push(item);
        } else if (item?.watcher_id) {
          watchers.push(item.watcher_id);
        }
      }
    }

    for (const watcherId of watchers) {
      await TaskWatcher.create(
        {
          task_id: task.id,
          watcher_id: watcherId,
          client_id: data.client_id,
          created_by: data.created_by,
          updated_by: data.created_by,
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
      { model: Project, as: "project" },
      {
        model: TaskWatcher,
        as: "watchers",
        include: [
          {
            model: User,
            as: "watcher",
          },
        ],
      },
    ],
  });
};

export const getTaskById = async (id: string) => {
  const task = await Task.findOne({
    where: { id },
    include: [
      { model: TaskStatus, as: "status" },
      { model: Project, as: "project" },
      {
        model: TaskWatcher,
        as: "watchers",
        include: [
          {
            model: User,
            as: "watcher",
          },
        ],
      },
    ],
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