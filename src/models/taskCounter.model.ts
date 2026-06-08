import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";

interface UserTaskCounterAttributes {
  id: string;
  user_id: string;
  task_id: string;
  is_viewed?: boolean;
  viewed_on?: Date;
}

type UserTaskCounterCreationAttributes = Optional<
  UserTaskCounterAttributes,
  "id" | "is_viewed" | "viewed_on"
>;

class UserTaskCounter
  extends Model<
    UserTaskCounterAttributes,
    UserTaskCounterCreationAttributes
  >
  implements UserTaskCounterAttributes
{
  public id!: string;
  public user_id!: string;
  public task_id!: string;
  public is_viewed?: boolean;
  public viewed_on?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserTaskCounter.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
    },
    is_viewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    viewed_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "user_task_counters",
    timestamps: false,
  }
);

export default UserTaskCounter;