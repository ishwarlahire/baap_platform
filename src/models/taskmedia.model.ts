import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";
// import { convertEmptyStringsToNull } from "../db/hooks/convert_empty_strings_to_null";
// import { beforeSave } from "../db/hooks/time_format_hook";

interface TaskMediaAttributes {
  id: string;
  task_id?: string;
  project_id?: string;
  media_owner_type: "task" | "project";
  media_url: string;
  media_type: "image" | "video" | "document" | "excel";
  created_at?: Date;
  updated_at?: Date;
}

type TaskMediaCreationAttributes = Optional<TaskMediaAttributes, "id">;

class TaskMedia
  extends Model<TaskMediaAttributes, TaskMediaCreationAttributes>
  implements TaskMediaAttributes
{
  public id!: string;
  public task_id?: string;
  public project_id?: string;
  public media_owner_type!: "task" | "project";
  public media_url!: string;
  public media_type!: "image" | "video" | "document" | "excel";
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

TaskMedia.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "tasks",
        key: "id",
      },
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "projects",
        key: "id",
      },
    },
    media_owner_type: {
      type: DataTypes.ENUM("task", "project"),
      allowNull: false,
    },
    media_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    media_type: {
      type: DataTypes.ENUM("image", "video", "document", "excel"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "task_media",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    // hooks: {
    //   beforeValidate: (instance) => {
    //     convertEmptyStringsToNull(instance);
    //   },
    //   beforeSave: (instance) => {
    //     beforeSave(instance);
    //   },
    // },
  }
);

export default TaskMedia;