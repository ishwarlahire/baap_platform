import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";
import { DESIGN_STATUS } from "../constants/design-records.constant";

interface DesignRecordAttributes {
  id: string;
  project_id?: string;
  title: string;
  description?: string;
  current_status: typeof DESIGN_STATUS[number];
  assigned_designer_id?: string;
  assigned_reviewer_id?: string;
  client_id: string;
  task_id?: string;
  created_by: string;
  updated_by?: string;
}

type DesignRecordCreationAttributes = Optional<
  DesignRecordAttributes,
  | "id"
  | "project_id"
  | "description"
  | "assigned_designer_id"
  | "assigned_reviewer_id"
  | "task_id"
  | "updated_by"
>;

class DesignRecord
  extends Model<
    DesignRecordAttributes,
    DesignRecordCreationAttributes
  >
  implements DesignRecordAttributes
{
  public id!: string;
  public project_id?: string;
  public title!: string;
  public description?: string;
  public current_status!: typeof DESIGN_STATUS[number];
  public assigned_designer_id?: string;
  public assigned_reviewer_id?: string;
  public client_id!: string;
  public task_id?: string;
  public created_by!: string;
  public updated_by?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

DesignRecord.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    project_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "projects",
        key: "id",
      },
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    current_status: {
      type: DataTypes.ENUM(...DESIGN_STATUS),
      allowNull: false,
      defaultValue: "pending",
    },

    assigned_designer_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },

    assigned_reviewer_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },

    client_id: {
      type: DataTypes.UUID,
      allowNull: false
    //   references: {
    //     model: "clients",
    //     key: "id",
    //   },
    },

    task_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "tasks",
        key: "id",
      },
    },

    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "design_records",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default DesignRecord;