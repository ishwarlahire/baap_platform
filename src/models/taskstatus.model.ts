import sequelize from "../config/db";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface TaskStatusAttributes {
  id: string;
  name: string;
  description?: string;
  sequence?:number;
}

type TaskStatusCreationAttributes = Optional<TaskStatusAttributes, "id">;


class TaskStatus
  extends Model<TaskStatusAttributes, TaskStatusCreationAttributes>
  implements TaskStatusAttributes {

  public id!: string;
  public name!: string;
  public description?: string;
  public sequence?: number;
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
sequence: {
  type: DataTypes.INTEGER,
  allowNull:false,
}
  },
  {
    sequelize,
    tableName: "task_status",
    timestamps: false
  }
);

export default TaskStatus;