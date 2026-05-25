import ProjectType from "../models/projectType.model";
import { Op } from "sequelize";

export const createProjectType = async (data: any) => {
  if (!data.name) throw new Error("Name is required");
  const existing = await ProjectType.findOne({
    where: { name: data.name }
  });
  if (existing) throw new Error("Project type already exists");
  if (data.is_default) {
    await ProjectType.update(
      { is_default: false },
      { where: { is_default: true } }
    );
  }
  return await ProjectType.create(data);
};


export const getAllProjectTypes = async () => {
  return await ProjectType.findAll();
};

export const getProjectTypeById = async (id: string) => {
  const type = await ProjectType.findByPk(id);
  if (!type) throw new Error("Project type not found");

  return type;
};

export const updateProjectType = async (id: string, data: any) => {
  const type = await ProjectType.findByPk(id);
  if (!type) throw new Error("Project type not found");
  if (data.name) {
    const existing = await ProjectType.findOne({
      where: {
        name: data.name,
        id: { [Op.ne]: id }
      }
    });
    if (existing) throw new Error("Project type already exists");
  }
  if (data.is_default) {
    await ProjectType.update(
      { is_default: false },
      { where: { is_default: true } }
    );
  }
  await ProjectType.update(data, { where: { id } });
  return { message: "Project type updated successfully" };
};

export const deleteProjectType = async (id: string) => {
  const type = await ProjectType.findByPk(id);
  if (!type) throw new Error("Project type not found");
  await ProjectType.destroy({ where: { id } });
  return { message: "Project type deleted successfully" };
};