import ProjectStatus from "../models/projectstatus.model";
import { Op } from "sequelize";

export const createStatus = async (data: any) => {
  if (!data.name) {
    throw new Error("Status name is required");
  }
  const existing = await ProjectStatus.findOne({
    where: {
      name: data.name
    }
  });
  if (existing) {
    throw new Error("Status name already exists");
  }
  return await ProjectStatus.create(data);
};


export const getAllStatus = async () => {
  return await ProjectStatus.findAll();
};

export const getStatusById = async (id: string) => {
  if (!id) {
    throw new Error("ID is required");
  }
  const status = await ProjectStatus.findOne({ where: { id } });
  if (!status) {
    throw new Error("Status not found");
  }
  return status;
};


export const updateStatus = async (id: string, data: any) => {
  if (!id) {
    throw new Error("ID is required");
  }
  const status = await ProjectStatus.findOne({ where: { id } });
  if (!status) {
    throw new Error("Status not found");
  }
  if (data.name) {
    const existing = await ProjectStatus.findOne({
      where: {
        name: data.name,
        id: { [Op.ne]: id }
      }
    });

    if (existing) {
      throw new Error("Status name already exists");
    }
  }
  await ProjectStatus.update(data, { where: { id } });
  return { message: "Status updated successfully" };
};

export const deleteStatus = async (id: string) => {
  if (!id) {
    throw new Error("ID is required");
  }
  const status = await ProjectStatus.findOne({ where: { id } });
  if (!status) {
    throw new Error("Status not found");
  }
  await ProjectStatus.destroy({ where: { id } });
  return { message: "Status deleted successfully" };
};