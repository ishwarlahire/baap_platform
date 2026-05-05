import sequelize from "../config/db";
import { DataTypes, Model } from "sequelize";

class ProjectAssignee extends Model {
  declare id: string;
  declare project_id: string;
  declare assigned_to: string;
  declare assigned_by?: string;
  declare assigned_at?: Date;
  declare assign_to_external?: string;
  declare created_by?: string;
  declare updated_by?: string;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare custom_field: object;
}

ProjectAssignee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    assigned_to: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    assigned_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    assigned_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    custom_field: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    assign_to_external: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.UUID,
    },
    updated_by: {
      type: DataTypes.UUID,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "project_assignees",
    timestamps: false,
    underscored: true,
  }
);

export default ProjectAssignee;