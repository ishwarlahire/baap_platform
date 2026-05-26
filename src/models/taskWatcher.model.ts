import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";
// import { convertEmptyStringsToNull } from "../db/hooks/convert_empty_strings_to_null";
// import { beforeSave } from "../db/hooks/time_format_hook";

interface TaskWatcherAttributes {
  id: string;
  task_id: string;
  watcher_id: string;
  client_id: string;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

type TaskWatcherCreationAttributes = Optional<TaskWatcherAttributes, "id">;

class TaskWatcher
  extends Model<TaskWatcherAttributes, TaskWatcherCreationAttributes>
  implements TaskWatcherAttributes
{
  public id!: string;
  public task_id!: string;
  public watcher_id!: string;
  public client_id!: string;
  public created_by?: string;
  public updated_by?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

TaskWatcher.init(
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
        key: "id",
      },
    },
    watcher_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
    //   references: {
    //     model: "clients",
    //     key: "id",
    //   },
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "task_watchers",
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

export default TaskWatcher;