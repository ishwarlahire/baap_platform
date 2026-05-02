import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface TaskStatusAttributes {
  id: string;
  name: string;
  description?: string;
  is_default?: boolean;
  task_id?:string | null;
  level?:number;
}

type TaskStatusCreationAttributes = Optional<TaskStatusAttributes, "id">;


class TaskStatus
  extends Model<TaskStatusAttributes, TaskStatusCreationAttributes>
  implements TaskStatusAttributes {

  public id!: string;
  public name!: string;
  public description?: string;
  public is_default?: boolean;
  public task_id?: string|null;
  public level?: number;
}


TaskStatus.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    task_id: {
  type: DataTypes.UUID,
  allowNull: true
},

level: {
  type: DataTypes.INTEGER,
  defaultValue: 1
}
  },
  {
    sequelize,
    tableName: "task_status",
    timestamps: false
  }
);

export default TaskStatus;