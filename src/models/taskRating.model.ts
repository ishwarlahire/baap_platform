import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";
// import { convertEmptyStringsToNull } from "../db/hooks/convert_empty_strings_to_null";
// import { beforeSave } from "../db/hooks/time_format_hook";

interface TaskRatingAttributes {
  id: string;
  task_id: string;
  rating: number;
  comment?: string;
  created_by?: string;
  is_deleted?: boolean;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  
}

type TaskRatingCreationAttributes = Optional<TaskRatingAttributes, "id">;

class TaskRating
  extends Model<TaskRatingAttributes, TaskRatingCreationAttributes>
  implements TaskRatingAttributes
{
  public id!: string;
  public task_id!: string;
  public rating!: number;
  public comment?: string;
  public is_deleted?: boolean;
  public created_by?: string;
  public updated_by?: string;
  

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

TaskRating.init(
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

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_deleted: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
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
    tableName: "task_ratings",
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

export default TaskRating;