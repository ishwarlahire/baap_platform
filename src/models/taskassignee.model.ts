import sequelize from "../config/db";
import { DataTypes, Model } from "sequelize";

class TaskAssignee extends Model {
  declare id: string;
  declare task_id: string;
  declare assigned_to: string;
  declare assigned_by?: string;
  declare custom_field: object;
  declare assign_to_external?: string;
  declare created_by: string;
  declare updated_by: string;
  declare created_at: Date;
  declare updated_at: Date;
}

TaskAssignee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id"
      }
    },
    assigned_to: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id"
      }
    },
    assigned_by: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id"
      }
    },
    custom_field: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
    assign_to_external: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
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
    tableName: "task_assignees",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["task_id", "assigned_to"]
      }
    ],
  }
);

export default TaskAssignee;