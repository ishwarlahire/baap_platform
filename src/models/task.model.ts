import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface TaskAttributes {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status_id: string;
  priority?: string;
  assigned_to?: string;
  due_date?: Date;
  created_by: string;
}

type TaskCreationAttributes = Optional<TaskAttributes, "id">;

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes {

  public id!: string;
  public project_id!: string;
  public title!: string;
  public description?: string;
  public status_id!: string;
  public priority?: string;
  public assigned_to?: string;
  public due_date?: Date;
  public created_by!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: "medium"
    },
    assigned_to: {
      type: DataTypes.UUID
    },
    due_date: {
      type: DataTypes.DATE
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default Task;