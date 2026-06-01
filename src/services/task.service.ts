import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

import Task from "../models/task.model";
import TaskStatus from "../models/taskstatus.model";
import Project from "../models/project.model";
import TaskAssignee from "../models/taskassignee.model";
import TaskWatcher from "../models/taskWatcher.model";
import User from "../models/user.model";
import TaskMedia from "../models/taskmedia.model";
import sequelize from "../config/db";
import { DataTypes, Model, Optional, Op } from "sequelize";

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

    const watchers: string[] = Array.isArray(watcher_ids) ? watcher_ids : [];

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

const formatTaskResponse = (task: any) => {
  const json = task.toJSON();

  return {
    ...json,
    watchers: (json.watchers || []).map((item: any) => ({
      watcher: item.watcher,
    })),
    media: json.media || [],
  };
};




const include = [
  { model: TaskStatus, as: "status" },
  { model: Project, as: "project" },
  {
    model: TaskWatcher,
    as: "watchers",
    include: [{ model: User, as: "watcher" }],
  },
  {
    model: TaskMedia,
    as: "media",
  },
];

export const getTasks = async (
  filter: string = "all-task",
  userId?: string
) => {
  if (filter === "all-task" || !filter) {
    const tasks = await Task.findAll({ include });
    return tasks.map((task) => formatTaskResponse(task));
  }

  if (!userId) {
    throw new Error("User id is required for this filter");
  }

  let taskIds: string[] = [];

  if (filter === "assigned-to") {
    const rows = await TaskAssignee.findAll({
      where: { assigned_to: userId },
      attributes: ["task_id"],
      raw: true,
    });

    taskIds = rows.map((row: any) => row.task_id);
  } else if (filter === "assigned-by") {
    const rows = await TaskAssignee.findAll({
      where: { assigned_by: userId },
      attributes: ["task_id"],
      raw: true,
    });

    taskIds = rows.map((row: any) => row.task_id);
  } else if (filter === "my-task") {
    const assignedToRows = await TaskAssignee.findAll({
      where: { assigned_to: userId },
      attributes: ["task_id"],
      raw: true,
    });

    const assignedByRows = await TaskAssignee.findAll({
      where: { assigned_by: userId },
      attributes: ["task_id"],
      raw: true,
    });

    const assignedToIds = assignedToRows.map((row: any) => row.task_id);
    const assignedByIds = assignedByRows.map((row: any) => row.task_id);

    taskIds = [...new Set([...assignedToIds, ...assignedByIds])];
  } else {
    throw new Error("Invalid filter type");
  }

  if (taskIds.length === 0) {
    return [];
  }

  const tasks = await Task.findAll({
    where: {
      id: {
        [Op.in]: taskIds,
      },
    },
    include,
  });

  return tasks.map((task) => formatTaskResponse(task));
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
      {
        model: TaskMedia,
        as: "media",
      },
    ],
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return formatTaskResponse(task);
};

export const updateTask = async (id: string, data: any) => {
  await Task.update(data, { where: { id } });

  return { message: "Task updated successfully" };
};

export const deleteTask = async (id: string) => {
  await Task.destroy({ where: { id } });

  return { message: "Task deleted successfully" };
};

export const uploadTaskMedia = async (
  taskId: string,
  files: any[],
  createdBy: string
) => {
  const t = await sequelize.transaction();

  try {
    const task = await Task.findOne({
      where: { id: taskId },
      transaction: t,
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (!createdBy) {
      throw new Error("created_by is required");
    }

    if (!Array.isArray(files) || files.length === 0) {
      throw new Error("No files uploaded");
    }

    const uploadDir = path.join(process.cwd(), "uploads", "task-media", taskId);
    await fs.mkdir(uploadDir, { recursive: true });

    const getMediaType = (
      file: any
    ): "image" | "video" | "document" | "excel" => {
      const mime = (file.mimetype || "").toLowerCase();
      const ext = path.extname(file.filename || "").toLowerCase();

      if (mime.startsWith("image/")) return "image";
      if (mime.startsWith("video/")) return "video";

      if (
        mime === "application/pdf" ||
        mime === "application/octet-stream" ||
        ext === ".pdf" ||
        ext === ".doc" ||
        ext === ".docx"
      ) {
        return "document";
      }

      if (
        mime === "application/vnd.ms-excel" ||
        mime === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        ext === ".xls" ||
        ext === ".xlsx" ||
        ext === ".csv"
      ) {
        return "excel";
      }

      throw new Error(`Unsupported media type: ${file.mimetype}`);
    };

    const uploaded: any[] = [];

    for (const file of files) {
      const fileExt = path.extname(file.filename || "");
      const fileName = `${Date.now()}-${crypto.randomUUID()}${fileExt}`;
      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, file.buffer);

      const mediaUrl = `/uploads/task-media/${taskId}/${fileName}`;
      const mediaType = getMediaType(file);

      const media = await TaskMedia.create(
        {
          task_id: task.id,
          project_id: task.project_id || undefined,
          media_owner_type: "task",
          media_url: mediaUrl,
          media_type: mediaType,
        },
        { transaction: t }
      );

      uploaded.push(media);
    }

    await t.commit();

    return {
      message: "Task media uploaded successfully",
      data: uploaded,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};