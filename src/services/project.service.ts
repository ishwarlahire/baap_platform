import Project from "../models/project.model";
import ProjectStatus from "../models/projectstatus.model";
import Task from "../models/task.model";
import ProjectAssignee from "../models/projectAssignee.model";
import sequelize from "../config/db";

// services/project.service.ts

export const createProject = async (data: any) => {
  const t = await sequelize.transaction();

  try {
    if (!data.name) throw new Error("Project name is required");
    if (!data.created_by) throw new Error("created_by is required");

    let statusId = data.status_id;
    if (!statusId) {
      const defaultStatus = await ProjectStatus.findOne({
        where: { is_default: true }
      });
      if (!defaultStatus) throw new Error("Default project status not found");
      statusId = defaultStatus.getDataValue("id");
    }
    const { assigned_to, ...projectData } = data;
    const project = await Project.create(
      {
        ...projectData,
        status_id: statusId
      },
      { transaction: t }
    );

    if (assigned_to) {
      if (!Array.isArray(assigned_to)) {
        throw new Error("assigned_to must be an array");
      }

      const assigneeRows = assigned_to.map((userId: string) => ({
        project_id: project.getDataValue("id"),
        assigned_to: userId,
        assigned_by: data.created_by,
        created_by: data.created_by,
        updated_by: data.created_by
      }));

      await ProjectAssignee.bulkCreate(assigneeRows, { transaction: t });
    }

    await t.commit();
    return project;

  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const getProjects = async () => {
  return await Project.findAll({
    include: [
      { model: ProjectStatus, as: "status" },
      { model: Task, as: "tasks" }
    ]
  });
};

export const getProjectById = async (id: string) => {
  const project = await Project.findOne({
    where: { id },
    include: [
      { model: ProjectStatus, as: "status" },
      { model: Task, as: "tasks" }
    ]
  });

  if (!project) throw new Error("Project not found");

  return project;
};

export const updateProject = async (id: string, data: any) => {
  await Project.update(data, { where: { id } });
  return { message: "Project updated successfully" };
};

export const deleteProject = async (id: string) => {
  await Project.destroy({ where: { id } });
  return { message: "Project deleted successfully" };
};