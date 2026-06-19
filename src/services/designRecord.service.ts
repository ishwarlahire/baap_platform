import DesignRecord from "../models/designRecord.model";
import DesignVersion from "../models/designVersion.model";
import sequelize from "../config/db";

export const createDesignRecord = async (data: any) => {
  const t = await sequelize.transaction();

  try {
    const record = await DesignRecord.create(data, {
      transaction: t,
    });

    await DesignVersion.create(
      {
        design_record_id: record.id,
        version_number: "V1",
        version_seq: 1,
        version_description: "Initial Version",
        status: "draft",
        created_by: data.created_by,
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return record;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const getDesignRecords = async () => {
  return await DesignRecord.findAll();
};

export const getDesignRecordById = async (id: string) => {
  const record = await DesignRecord.findByPk(id);

  if (!record) {
    throw new Error("Design record not found");
  }

  return record;
};

export const updateDesignRecord = async (
  id: string,
  data: any
) => {
  const record = await DesignRecord.findByPk(id);

  if (!record) {
    throw new Error("Design record not found");
  }

  await record.update(data);

  return {
    message: "Design record updated successfully",
  };
};

export const deleteDesignRecord = async (
  id: string
) => {
  const record = await DesignRecord.findByPk(id);

  if (!record) {
    throw new Error("Design record not found");
  }

  await record.destroy();

  return {
    message: "Design record deleted successfully",
  };
};
